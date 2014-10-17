# ProcessRunner

Node.js + Express web application designed to be used with GitHub Webhooks, to automate processes on AWS machines.

## Usage

- Fill out the ```config.json``` file, as shown in the example below.
```json
{
	"passphrase": "enter-passphrase-here",
	"scripts": [
			"/path/to/script.sh",
			"/path/to/second/script.sh"
		]
}
```

There are two endpoints for the API:

#### Endpoint: ```/```
##### Method: ```POST```
##### Parameters: ```key```
##### Description: This endpoint triggers the scripts to be run

#### Endpoint ```/reload-config```
##### Method: ```POST```
##### Parameters: ```key```
##### Description: This endpoint makes the application reload the configuration file

## Contact

This is an open source project released under the [MIT License](LICENSE). Contact me if you want to suggest an improvement, or fork and send a pull request!

http://rukmal.me