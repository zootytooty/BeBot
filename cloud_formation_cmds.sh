# Zoot Formation

# From https://github.com/ernestgwilsonii/genericSlackBotkitFargate
aws cloudformation deploy --stack-name=bebot-stack --template-file=chatops-stack.yml --parameter-overrides ServiceName=bebot ImageTag=latest --capabilities=CAPABILITY_IAM
aws cloudformation describe-stack-events --stack-name bebot > stack_events.json


# From https://medium.com/containers-on-aws/deploy-the-voting-app-to-aws-ecs-with-fargate-cb75f226408f
# This results in a Public IP
aws cloudformation deploy --stack-name=bebot-stack --template-file=aws/cluster.yml --parameter-overrides ServiceName=bebot ImageTag=latest --capabilities=CAPABILITY_IAM


# View the builds
aws cloudformation list-stacks


# If needed, run this to delete a stack
aws cloudformation delete-stack --stack-name bebot