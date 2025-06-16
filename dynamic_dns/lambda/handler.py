import json
import boto3
import os

route53 = boto3.client("route53")

HOSTED_ZONE_ID = os.environ["HOSTED_ZONE_ID"]
RECORD_NAME = os.environ["RECORD_NAME"]
API_KEY = os.environ["API_KEY"]


def lambda_handler(event, context):
    if event["headers"]["x-api-key"] != API_KEY:
        return {"statusCode": 401, "body": json.dumps({"error": "Unauthorized"})}
    try:
        body = json.loads(event["body"])
        ip_address = body["ip"]

        route53.change_resource_record_sets(
            HostedZoneId=HOSTED_ZONE_ID,
            ChangeBatch={
                "Changes": [
                    {
                        "Action": "UPSERT",
                        "ResourceRecordSet": {
                            "Name": RECORD_NAME,
                            "Type": "A",
                            "TTL": 300,
                            "ResourceRecords": [{"Value": ip_address}],
                        },
                    }
                ]
            },
        )
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "DNS record updated", "ip": ip_address}),
        }
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
