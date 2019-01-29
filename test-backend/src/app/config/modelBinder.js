export default ({ File }) => ([
  {
    param: 'user',
    modelName: 'User',
  },
  {
    param: 'file',
    modelName: 'File',
    loadCb: (hash) => File.findOne({
      where: { name: hash }
    })
  },
  {
    param: 'bankInformation',
    modelName: 'BankInformation'
  }
])
