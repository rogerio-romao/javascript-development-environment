import { Logtail } from "@logtail/browser";
import { deleteUser, getUsers } from "./api/userApi.js";
import "./index.css";

const logtail = new Logtail("yCgp2NxaXqvzg1i25ow1izWi");

logtail.error("Something bad happend.");
logtail.info("Log message with structured data.", {
    item: "Orange Soda",
    price: 100.0,
});

// Ensure that all logs are sent to Logtail
logtail.flush();

// Populate table of users via API call.
getUsers().then((result) => {
    let usersBody = "";

    result.forEach((user) => {
        usersBody += `<tr>
            <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
        </tr>`;
    });

    document.getElementById("users").innerHTML = usersBody;

    const deleteLinks = document.getElementsByClassName("deleteUser");

    // Must use array.from to create a real array from a DOM collection.
    // getElementsByClassName only returns an "array like" object.
    Array.from(deleteLinks, (link) => {
        link.onclick = function (event) {
            const element = event.target;
            event.preventDefault();
            deleteUser(element.attributes["data-id"].value);
            const row = element.parentNode.parentNode;
            row.parentNode.removeChild(row);
        };
    });
});
