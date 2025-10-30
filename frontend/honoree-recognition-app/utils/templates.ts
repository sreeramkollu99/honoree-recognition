interface LetterData {
  recipientName: string
  recipientTitle: string
  honoreeName: string
  project: string
  date: string
  state: string
  additionalDetails: string
}

export function getLetterTemplate(type: string, data: LetterData): string {
  const templates: Record<string, (data: LetterData) => string> = {
    "governor-letter": (data) => `${data.date}

${data.recipientName}
${data.recipientTitle}
State Capitol
${data.state}

Dear ${data.recipientName}:

I am writing to request a letter of recognition for ${data.honoreeName}, an outstanding young person who has demonstrated exceptional dedication and achievement through their work on: ${data.project}.

${data.honoreeName} has shown remarkable commitment to excellence and service to our community. Their achievement represents the highest standards of youth accomplishment and deserves recognition from our state's leadership.

${data.additionalDetails ? `\n${data.additionalDetails}\n` : ""}
This recognition would mean a great deal to ${data.honoreeName} and their family, and would serve as an inspiration for continued excellence and service.

Thank you for considering this request. I would be honored if you could provide a letter of recognition acknowledging ${data.honoreeName}'s outstanding achievement.

Respectfully,

[Your Name]
[Your Address]
[Your Contact Information]`,

    "presidential-greeting": (data) => `${data.date}

The White House
Greetings Office
1600 Pennsylvania Avenue NW
Washington, DC 20500

Dear Greetings Office:

I am writing to request a Presidential greeting for ${data.honoreeName} in recognition of their exceptional achievement: ${data.project}.

${data.honoreeName} has demonstrated outstanding dedication, leadership, and commitment to excellence. This achievement represents years of hard work and embodies the values of service and perseverance that make our nation strong.

${data.additionalDetails ? `\n${data.additionalDetails}\n` : ""}
A Presidential greeting would be a tremendous honor for ${data.honoreeName} and would serve as lasting recognition of their accomplishment.

Event Details:
- Honoree: ${data.honoreeName}
- Achievement: ${data.project}
- State: ${data.state}
- Recognition Date: ${data.date}

Thank you for your consideration of this request.

Sincerely,

[Your Name]
[Your Address]
[Your Contact Information]
[Your Phone Number]`,
  }

  const template = templates[type]
  if (!template) {
    return `Letter template for ${type} is not available yet.`
  }

  return template(data)
}
