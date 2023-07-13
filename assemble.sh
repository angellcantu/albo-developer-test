# Running the gradle build command

set -x;

gradle build

echo "Everything OK" || echo "Error while executing last comand";

set +x;