// Function to format a message inside a box
def formatMessage(String message) {
    def padding = 30
    def lineLength = message.length() + 2 * padding
    def line = "+" + ("-" * lineLength) + "+"
    def newMessage = "|" + " " * padding + message.toUpperCase() + " " * padding + "|"
    def emptyLine = "|" + " " * lineLength + "|"

    def formattedMessage = "${line}\n${emptyLine}\n${newMessage}\n${emptyLine}\n${line}"
    return formattedMessage
}

def sendSlackNotification(String title, String message, String color, String webhook) {
    def payload = """
    {
        "attachments": [
            {
                "fallback": "${title}",
                "color": "${color}",
                "title": "${title}",
                "text": "${message}"
            }
        ]
    }
    """

    sh """
    curl -X POST -H 'Content-type: application/json' --data '${payload}' ${webhook}
    """
}


return this
