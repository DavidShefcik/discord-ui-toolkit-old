
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'discord-dark',
    values: [
      {
        name: 'discord-dark',
        value: '#36393f'
      },
      {
        name: 'discord-light',
        value: '#ffffff'
      }
    ]
  }
}