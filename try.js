const storage = require('sessionstorage')
const phone = 758589465
storage.setItem('phone', phone)

console.log('item set:', storage.getItem('phone'))