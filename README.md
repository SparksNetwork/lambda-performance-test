# AWS lambda testing

This is a really simple and short test of using AWS lambda with SNS or Kinesis for broadcasting messages.

## Requirements:

* Apex (apex.run)
* Terraform (terraform.io)
* NodeJS

```
brew install terraform
brew install node-build nodenv
nodenv install 6.6.0
nodenv use 6.6.0
curl https://raw.githubusercontent.com/apex/apex/master/install.sh | sh
```

Note that you also need our terraform repo to generate the required resources.

## Install / setup

```
npm install
apex deploy
apex list --tfvars > ../terraform/apex.tfvars
cd ../terraform
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
