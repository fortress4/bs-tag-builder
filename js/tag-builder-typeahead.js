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
                   type: "POST",
                   url: 'data/libs.json',
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

               /!*if ( event.keyCode == 13 ) {
                  console.log('keyCode Press: Submit');

                  var tb_field = $('#props_aliasListTA');
                  var tb_bin = $('#props_aliasListTA_bin');
                  var tb_add_field = $('#props_aliasListTA_add');
                  tb_addTag(tb_field,tb_bin,tb_add_field,event);
               }*!/

            }*/
         }
         ,debug: false
      });

      /*$('#exampleThree_add').on('keydown.typeahead',function(event){

         console.log('keyDown Triggered: exampleThree_add');
         //console.log('event: ', event);

         if ( event.keyCode == 13 ) {
            //console.log('on(keydown.typeahead): keyCode Press 13');

            var tb_field = $('#exampleThree');
            var tb_bin = $('#exampleThree_bin');
            var tb_msg = $('#exampleThree_msg');
            var tb_add_field = $('#exampleThree_add');
            //tb_addTag(tb_field,tb_bin,tb_msg,tb_add_field,event);
         }

      });*/

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
                   type: "POST",
                  url: 'data/libs.json',
               }
            }
         }
         ,debug: false
      });

      /*$('#exampleFour_add').on('keydown.typeahead',function(event){

         console.log('keyDown Triggered: exampleFour_add');
         //console.log('event: ', event);
         if ( event.keyCode == 13 ) {
            //console.log('on(keydown.typeahead): keyCode Press 13');

            var tb_field = $('#exampleFour');
            var tb_bin = $('#exampleFour_bin');
            var tb_msg = $('#exampleFour_msg');
            var tb_add_field = $('#exampleFour_add');

            //tb_addTag(tb_field,tb_bin,tb_msg,tb_add_field,event);
         }
      });*/

   }

});