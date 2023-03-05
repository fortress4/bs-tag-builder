/* tag-builder-typeahead.js */
if( $('.typeahead').length ) {

   //console.log('-- Build Typeahead --');

   $.typeahead({
      input: '#props_aliasList_add',
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
                url: ajaxBaseUrl + '?method=getResourceAliasItems',
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

   /*$('#props_aliasList_add').on('keydown.typeahead',function(event){

      console.log('keyDown Triggered: props_aliasList_add');
      //console.log('event: ', event);

      if ( event.keyCode == 13 ) {
         //console.log('on(keydown.typeahead): keyCode Press 13');

         var tb_field = $('#props_aliasList');
         var tb_bin = $('#props_aliasList_bin');
         var tb_msg = $('#props_aliasList_msg');
         var tb_add_field = $('#props_aliasList_add');

         //tb_addTag(tb_field,tb_bin,tb_msg,tb_add_field,event);
      }
   });*/

   $('#props_groups_add').typeahead({
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
                url: ajaxBaseUrl + '?method=getResourceGroupItems',
            }
         }
      }
      ,debug: false
   });

   /*$('#props_groups_add').on('keydown.typeahead',function(event){

      console.log('keyDown Triggered: props_groups_add');
      //console.log('event: ', event);
      if ( event.keyCode == 13 ) {
         //console.log('on(keydown.typeahead): keyCode Press 13');

         var tb_field = $('#props_groups');
         var tb_bin = $('#props_groups_bin');
         var tb_msg = $('#props_groups_msg');
         var tb_add_field = $('#props_groups_add');

         //tb_addTag(tb_field,tb_bin,tb_msg,tb_add_field,event);
      }
   });*/

}