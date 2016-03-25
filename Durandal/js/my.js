/*
 * @Author: Josh Howard
 * @Date:   2016-03-24 19:02:52
 * @Last Modified by:   Josh Howard
 * @Last Modified time: 2016-03-25 01:16:42
 */

'use strict';
console.log('Loading Custom Javascript');



function loadPosts() {
    console.log('Starting: [loadPosts()]')
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    var jsonURL = 'db.json';
    xhr.open("GET", jsonURL);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var table = document.getElementById("jh_data");
            table.appendChild(document.createElement('thead'));
            var items = null;
            for (var i = 0; i < Object.keys(data.posts[0]).length; i++) {
                if (items === null) {
                    items = "<th data-field='" + Object.keys(data.posts[0])[i] + "'>" + Object.keys(data.posts[0])[i] + "</th>";
                } else {
                    items += "<th data-field='" + Object.keys(data.posts[0])[i] + "'>" + Object.keys(data.posts[0])[i] + "</th>";
                }
            }
            (table.childNodes[0]).innerHTML = items;
            for (var i = 0; i < data.posts.length; i++) {
                var tr = document.createElement('tr');
                for (var ii = 0; ii < Object.keys(data.posts[i]).length; ii++) {
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(data.posts[i][Object.keys(data.posts[i])[ii]]));
                    tr.appendChild(item);
                    table.appendChild(tr);
                }
            }
        }
    }
    xhr.send(null);
}

function createWelcome(un) {
	var container = document.getElementsByClassName("container")[0];
	var html = document.createElement("div");
		html.innerHTML = "<h2>These are not stories of the Chupacabra</h2><div class='alert alert-success'><strong>Welcome " + un +"!</strong></div><h4>This is an example of sample data loaded from a json data source. The login method you used to get here is written in Javascript and PHP in conjunction with a MySQL database.<br /><br /> Now that you're logged in please have a look at my fake data!</h4>";
	container.insertBefore(html,container.childNodes[0]);
}

document.getElementById("jh_submit").onclick = function() {
    var xhr = new XMLHttpRequest();
    var un = document.getElementById('username').value,
        pw = document.getElementById('password').value;
    var param = "username="+un+"&password="+pw;
    xhr.open("POST", "login.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhr.setRequestHeader("Content-length", param.length);
    xhr.onreadystatechange = function() { 
    	// console.log(xhr.readyState, xhr.status, xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == 200) {
		if (xhr.responseText == 1) {
			document.getElementById("jh_login").className += " hidden";
			createWelcome(un);
			loadPosts();
		} else {
			var errorbox = document.getElementById("jh_error");
			errorbox.className = "alert alert-danger";
			errorbox.innerHTML = "<strong>Failed:</strong> Wrong Username or Password!";
		}
	}
    };
    xhr.send(param);


};
