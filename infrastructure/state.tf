data "terraform_remote_state" "default" {
  backend = "s3"
  config {
    bucket = "terraform.sparks.network"
    key = "terraform.state"
    region = "us-west-2"
  }
}