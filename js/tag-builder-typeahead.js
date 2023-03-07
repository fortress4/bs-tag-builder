/* tag-builder-typeahead.js */
$(function() {

   console.log('typeahead: ', $('.typeahead'));

   if( $('.typeahead').length ) {

      //console.log('-- Build Typeahead --');

      // $.typeahead({
      //    input: '#exampleThree_add',

      $('#exampleThree_add').typeahead({
         minLength: 1,
         order: "asc",
         maxItem: 20,                 // Accepts 0 / false as "Infinity" meaning all the results will be displayed
         dynamic: true,
         offset: true,
         hint: false,
         source: {
         alias: {
               ajax: {
                   type: "GET",
                   url: 'data/libs.json',
                   dataType: 'json'
               }
            }
         },
         callback: {
            /*onClick: function (node, a, item, event) {
               console.log('onClick Typeahead item:', item);
               console.log(item.display + ' Selected!');
               formSubmitted = true;
               console.log('onClick Typeahead: formSubmitted: ', formSubmitted);
            },*/
            /*onSubmit: function(node, form, items, event) {
               event.preventDefault();
               event.stopPropagation();
               return false;

               console.log('onSubmit TypeAhead is firing!');
               console.log('onSubmit TypeAhead: formSubmitted: ', formSubmitted);

               //alert(JSON.stringify(items));
            }*/
         }
         ,debug: false
      });

      $('#exampleFour_add').typeahead({
         minLength: 1,
         order: "asc",
         maxItem: 20,                 // Accepts 0 / false as "Infinity" meaning all the results will be displayed
         dynamic: true,
         offset: false,
         hint: false,
         source: {
         alias: {
               ajax: {
                  type: "GET",
                  url: 'data/libs.json',
                  dataType: 'json'
               }
            }
         }
         ,debug: false
      });

   }

});