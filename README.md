# AWS lambda testing

This is a really simple and short test of using AWS lambda 
with SNS or Kinesis for broadcasting messages. The 
producers will broadcast 100 messages. The consumers will 
consume those messages and write the time it took them to 
get the message into a dynamodb table. The producer will be 
waiting for all it's messages to be written to that table 
and will then produce the stats.

Time given is in seconds. The total doesn't mean much as the producer has to poll dynamodb.

## Requirements:

* Apex (apex.run)
* Terraform (terraform.io)
* Our terraform project (github.com/SparksNetwork/terraform) checked out into ../terraform
* NodeJS

```
# Terraform
brew install terraform
# Node
brew install node-build nodenv
nodenv install 6.6.0
nodenv use 6.6.0
# Apex
curl https://raw.githubusercontent.com/apex/apex/master/install.sh | sh
```

## Install / setup

```
npm install
apex deploy
apex list --tfvars > ../terraform/apex.tfvars
```

Now in terraform you must uncomment the code in the file `lambda-performance.tf` and run:

```
bin/plan
bin/apply
```

## Running

### SNS:
```
apex invoke sns-producer < events.json
```

This will output some stats like so:

```
{"mean":6.0888100000000005,"median":6.803,"stddev":1.744622756913081,"total":16.721}
```

### Kinesis:
```
apex invoke kinesis-producer < events.json
```

```
{"mean":5.446699999999998,"median":5.524,"stddev":1.0865956806006547,"total":12.121}
```

## Cleaning up

To remove the resources used run:

```
apex delete
```

And then in the terraform project comment the contents of `lambda-performance.tf` and run:

```
bin/plan
bin/apply
```