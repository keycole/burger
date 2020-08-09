//Wrap everything inside a function to make sure we wait until the DOM is fully loaded
$( () => {
  $(".devourBurger").click( event => {
      console.log(`The devour it button was clicked....`);
      console.log(`This data-devoured is ${$(this).data("devouredstate")} inside the devourBurger click function.`);
      let id = $(this).data("id");
      let devouredState = $(this).data("devouredstate");

      let newDevouredState = {
          devoured : devouredState
      };

      // Send the PUT request
      $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: newDevouredState
      }).then(
          () => {
              console.log(`Devoured was changed to ${devoured}`);
              //Reload the page to rebuild the updated list
              location.reload();
          }
      );
  });

  $("#addBurger").click( event => {
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
      }).then(
          () => {
              console.log(`The new Burger was added: ${JSON.stringify(newBurger)}`);
              // Reload the page to rebuild the updated list
              location.reload();
          }
      );
  });

  $(".deleteBurger").click( () => {
      console.log(`The delete button was clicked....`);
      console.log(`This data-id is ${$(this).data("id")} inside the delete click function.`);
      let id = $(this).data("id");

      // Send the DELETE request
      $.ajax("/api/burgers/" + id, {
          type: "DELETE"
      }).then(
          () => {
              console.log(`The burger has been deleted: ${id}`);
              //Reload the page to rebuild the updated list
              location.reload();
          }
      );
  });
});
