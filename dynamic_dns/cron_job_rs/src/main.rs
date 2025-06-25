use dotenv::dotenv;
use reqwest;
use reqwest::blocking::Client;
use reqwest::header::{HeaderMap, HeaderValue};
use serde::Serialize;
use std::env;
use std::fs;
use std::fs::File;
use std::io::Write;

#[derive(Serialize)]
struct IpUpdatePayload {
    ip: String,
}

fn read_stored_ip() -> Result<String, Box<dyn std::error::Error>> {
    Ok(fs::read_to_string("./saved_ip.txt")?)
}

fn get_public_ip() -> Result<String, Box<dyn std::error::Error>> {
    let ip_resp = reqwest::blocking::get("http://checkip.amazonaws.com")?.text()?;
    let current_ip = String::from(ip_resp.trim());

    Ok(current_ip)
}

fn submit_new_ip(new_ip: &str) -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    let lambda_api_key = env::var("LAMBDA_API_KEY")?;
    let lambda_endpoint = env::var("LAMBDA_ENDPOINT")?;
    let mut headers = HeaderMap::new();
    headers.insert("x-api-key", HeaderValue::from_str(&lambda_api_key)?);
    let payload = IpUpdatePayload {
        ip: new_ip.to_string(),
    };
    let client = Client::new();
    client
        .post(lambda_endpoint)
        .headers(headers)
        .json(&payload)
        .send()?;
    Ok(())
}

fn write_ip(new_ip: &str) -> Result<(), Box<dyn std::error::Error>> {
    let mut file = File::create("./saved_ip.txt")?;
    file.write_all(new_ip.as_bytes())?;
    Ok(())
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let current_ip = get_public_ip()?;
    let saved_ip = read_stored_ip()?;

    if current_ip != saved_ip {
        let _ = submit_new_ip(&current_ip);
        let _ = write_ip(&current_ip);
    }

    Ok(())
}
