//Wrap everything inside a function to make sure we wait until the DOM is fully loaded
$( () => {
  $(".devourBurger").click( event => {
      let id = $(this).data("id");
      let devouredState = $(this).data("devoured");

      let newDevouredState = {
          devoured: devouredState
      };

      // Send the PUT request
      $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: newDevouredState
      }).then(
          () => {
              console.log(`Devoured was changed to ${devouredState}`);
              //Reload the page to rebuild the updated list
              location.reload();
          }
      );
  });

  $("#addBurger").click( () => {
      console.log(`The add it button was clicked....`)
      event.preventDefault();

      let newBurger = {
          burger_name: $("#burger_name").val().trim(),
      };

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
