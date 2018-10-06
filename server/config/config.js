require('dotenv').config(); 
CONFIG = {} 
CONFIG.PORT = process.env.PORT || 3000
CONFIG.SECRET = process.env.SECRET || ''
CONFIG.MAXAGE = process.env.MAXAGE || 0
CONFIG.DBUSER = process.env.DBUSER || ''
CONFIG.DBPASSWORD = process.env.DBPASSWORD || ''
