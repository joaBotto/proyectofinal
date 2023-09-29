const getLogin = require('../controllers/getLogin')

const getLoginHandlers = async (req, res) => {
    try {
        const {email, password} = req.body;
        const access = await getLogin(email, password);
    return res.status(200).json(access)// VA A DEVOLVER TRUE O FALSE
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = getLoginHandlers;