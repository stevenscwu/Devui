import logging, os, json, time
import azure.functions as func
from openai import AzureOpenAI

def main(inputblob: func.InputStream, outputblob: func.Out[str]):
    logging.info("Processing blob: %s (%s bytes)", inputblob.name, inputblob.length)

    data = inputblob.read().decode("utf-8")
    if len(data) > 1_000_000:
        logging.warning("Input file too large; aborting.")
        return

    prompt = f"""
    You are a security engineer reviewing a SonarQube report in JSON format. Perform these tasks:
    1. List top 10 most severe issues with severity, file, message, and implications.
    2. Count issues by severity.
    3. Breakdown issues by type (bugs, vulnerabilities, code smells).
    4. Highlight hotspots.
    5. Provide actionable recommendations.

    SonarQube JSON:
    {data}
    """

    try:
        api_base = os.environ["OPENAI_API_BASE"]
        api_key = os.environ["OPENAI_API_KEY"]
        deployment_name = os.environ["OPENAI_DEPLOYMENT_NAME"]
        api_version = os.environ.get("OPENAI_API_VERSION", "2025-04-14")
    except KeyError as e:
        logging.error("Missing environment variable: %s", e)
        raise

    client = AzureOpenAI(api_key=api_key, azure_endpoint=api_base, api_version=api_version)

    try:
        response = client.chat.completions.create(
            model=deployment_name,
            messages=[{"role": "system", "content": prompt}],
            temperature=0.2,
            max_tokens=1500,
        )
        summary = response.choices[0].message.content
        logging.info("Token usage: %s", response.usage)
    except Exception as e:
        logging.error("OpenAI API error: %s", e)
        summary = f"Error: {e}"

    outputblob.set(summary)
