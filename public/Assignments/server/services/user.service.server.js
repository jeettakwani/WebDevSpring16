/**
 * Created by jtakwani on 3/15/16.
 */
module.exports = function(app, model){

    app.post('/api/assignment/user',createUser);
    app.get('/api/assignment/user',getAllUsers);
    app.get('/api/assignment/user/:id',getUserById);
    app.get('/api/assignment/user?username=username', getUserByUsername);
    //app.get('/api/assignment/user?username=username&password=password',findUserByCredentials);
    app.put('/api/assignment/user/:id',updateUser);
    app.delete('/api/assignment/user/:id',deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user = model.createUser(user);
        if(user) {
            res.send(200);
            return;
        }
        res.json({massage:"User not created"});
    }

    function getAllUsers(req, res) {
        var users = model.findAllUsers();
        res.json(users);
    }

    function getUserById(req, res) {
        var id = req.params.id;
        var user = model.findUserById(id);
        if(user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        var user = model.findUserByUsername(username);
        if(user) {
            res.json(user);
            return;
        }
        res.json({message: "User Not found"});
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;

        var user = model.updateUser(user);
        if(user) {
            res.send(200);
            return;
        }
        res.send(404);
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        if(model.deleteUserById(id)) {
            res.send(200);
            return;
        }
        res.json ({message: "User not found"});
    }

};