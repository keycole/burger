//Wrap everything inside a function to make sure we wait until the DOM is fully loaded
$(function(){
    $(".devourBurger").click(function(event){
        console.log(`The devour it button was clicked....`);
        console.log(`This data-id = ${$(this).data("id")}`);
        const id = $(this).data("id");
        
        console.log(`The id = ${id}`);
  
        const newDevouredState = {
            devoured: "true"
        };
  
        console.log(`The newDevouredState = ${JSON.stringify(newDevouredState)}`);
        // Send the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function(){
                console.log(`Devoured was changed to ${newDevouredState}`);
                //Reload the page to rebuild the updated list
                location.reload();
            }
        );
    });
  
    $("#addBurger").click(function(event){
        console.log(`The add it button was clicked....`)
        event.preventDefault();
  
        let newBurger = {
            burger_name: $("#name").val().trim()
        };
        console.log(`The newBurger inside addBurger - ${JSON.stringify(newBurger)}`);
  
        // Sent the POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function(){
                console.log(`The new Burger was added: ${JSON.stringify(newBurger)}`);
                // Reload the page to rebuild the updated list
                location.reload();
            }
        );
    });
  
    $(".deleteBurger").click(function(event){
        console.log(`The delete button was clicked....`);
        console.log(`This data-id is ${$(this).data("id")} inside the delete click function.`);
        const id = $(this).data("id");
  
        // Send the DELETE request
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(function(){
                console.log(`The burger has been deleted: ${id}`);
                //Reload the page to rebuild the updated list
                location.reload();
            }
        );
    });
  });
  