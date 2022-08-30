const bcrypt = require('bcryptjs')

const admin = [
    {
        name: 'Admin',
        email: 'Admin@gmail.com',
        password: bcrypt.hashSync('Admin1', 10),
        admin: true,
    },
]
