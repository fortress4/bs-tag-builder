/*
   tag-builder.js
*/

// declare variable to hold the value from input field
var tags_array = {};
var tagBuilderDebug = 0;

var tbConfig = {
      tagSorting: 0,
      autoComplete: 0,
      tagCase: '',
      tagClass: 'bg-primary',
      tagHoverClass: 'bg-warning'
   };
// console.log('tbConfig: ', tbConfig);

$(function() {

   // Init each of the tagBuilder Field Groups
   $('.tagBuilder').each(function(i, obj) {
      //console.log('tb_fields: ', i, obj);

      var tb_field = $(obj);
      var tb_field_id = tb_field.attr('id');

      // var tb_sortTags = tb_field.data('tagsorting');
      //var tb_autoComplete = tb_field.data('autocomplete');
      //var tb_tagCase = tb_field.data('tagcase');
      //var tb_lowerCase = tb_field.data('lowercasetags');

      tags_array[tb_field_id] = [];

      //tbConfig.tagSorting = tb_field.data('tagsorting');
      //tbConfig.autoComplete = tb_field.data('autocomplete');
      //tbConfig.tagCase = tb_field.data('tagcase');

      // Get the set config options
      tb_autoComplete(tb_field);
      tb_tagSorting(tb_field);
      //console.log('autoComplete: ',tbConfig.autoComplete);
      // console.log('tagSorting 1: ',tbConfig.tagSorting);

      // console.log('tb_field: ', i, obj);
      // console.log('tb_field_id: ', tb_field_id);
      // console.log('tb_sortTags: ', tb_sortTags);
      // console.log('tags_array: ', tb_field_id, tags_array[tb_field_id]);

      //console.log('tb_autoComplete: ', tb_autoComplete);
      //console.log('tb_tagCase: ', tb_tagCase);

      var tb_wrapper = tb_field.parent('.tagBuilderWrapper');

      var tb_bin = tb_wrapper.find('.tagBuilderBin');
      // var tb_bin = tb_field.prevAll('.tagBuilderBin');
      // var tb_bin_id = tb_bin.attr('id');

      // console.log('tb_bin: ',tb_bin);
      // console.log('tb_bin_id: ',tb_bin_id);

      var tb_msg = tb_wrapper.find('.tagBuilderMsg');
      //var tb_msg = tb_field.prevAll('.tagBuilderMsg');
      //var tb_msg_id = tb_msg.attr('id');

      // console.log('tb_msg: ',tb_msg);
      // console.log('tb_msg_id: ',tb_msg_id);

      var tb_add_field = tb_wrapper.find('.tagBuilderAdd');
      //var tb_add_field_id = tb_add_field.attr('id');

      // console.log('tb_add_field: ',tb_add_field);
      // console.log('tb_add_field_id: ',tb_add_field_id);

      // Populate the tags field with the current values
      var fldValue = tb_field.data('fieldvalue');
      var fldValueArr = [];

      if ( fldValue.trim().length )
         fldValueArr = fldValue.split(',');

      // console.log('fldValueArr: ',fldValueArr);

      if ( fldValueArr.length > 0 ) {
         tb_msg.addClass('d-none');
         tb_bin.removeClass('d-none');

         $.each(fldValueArr, function(index, value){
            tags_array[tb_field_id].push(value);
            tb_renderTag(tb_field,tb_bin,value);
         });
         tb_addTagToHiddenField(tb_field,fldValueArr);
      }
      else {
         tb_msg.removeClass('d-none');
         tb_bin.addClass('d-none');
      }

      // Add Field KeyDown Event (block submit)
      tb_add_field.keydown(function(e) {
        if (e.keyCode == 13)
            e.preventDefault();

         //if ( tbConfig.autoComplete )
         // addfield.prev('.typeahead__cancel-button').removeClass('d-none');
         // addfield.prev('.typeahead__cancel-button').css('visibility', 'visible');
      });

      // Add Field KeyUp Event
      tb_add_field.keyup(function(e) {
         if (e.keyCode == 13) {
            e.preventDefault();

            //console.log('tb_add_field:', tb_add_field);

            tb_addTag(tb_field,tb_bin,tb_msg,tb_add_field,e);
         }
      });

      // console.log('tbConfig.tagSorting',tbConfig.tagSorting);

      if ( tbConfig.tagSorting == 1 )
      {
         tb_tagHoverClass(tb_field);
         //console.log('tbConfig.tagHoverClass',tbConfig.tagHoverClass);

         sortable(tb_bin, {
             orientation: 'horizontal',
             hoverClass:  tbConfig.tagHoverClass,
             placeholder: '<span class="tagBuilderPH badge rounded-pill bg-secondary p-2 me-2 mb-1" style="width:90px">&nbsp;</span>',
         });

         sortable(tb_bin)[0].addEventListener('sortupdate', function(e) {
             var itemsArr = e.detail.origin.items;
             var tagArr = [];

             $.each( itemsArr, function( key, value ) {
                itemText = $(value).text();
                tagArr.push(itemText);
             });

             tags_array[tb_field_id] = tagArr;

             var fldValues = tagArr.join(',');
             tb_field.val(fldValues).data('fieldvalue',fldValues);

             // Sort Debug output
             if ( tagBuilderDebug )
             {
                console.log('tags_array: ',tb_field_id,tags_array[tb_field_id]);

                var dataAttr = tb_field.data('fieldvalue');
                console.log('data-fieldvalue: ',dataAttr);

                var dataVal = tb_field.val();
                console.log('hidden value: ',dataVal);
             }
         });
      }
      //console.log('tags_array: ', tags_array);
    });

   // CLick the X in the Tag item
   $('.tagBuilderBin').on('click', 'i', function() {
      var tagItm = $(this).parent();
      var itmName = tagItm.text();
      var tagBin = tagItm.parent();
      var fldInput = tagBin.next('.tagBuilder');
      var fldId = fldInput.attr('id');
      var fldWrapper = tagBin.parent('.tagBuilderWrapper');
      var fldMsg = fldWrapper.find('.tagBuilderMsg');
      //var sortTags = fldInput.data('tagsorting');

      // Get the set config options
      tb_tagSorting(fldInput);
      //console.log('tbConfig.tagSorting: ',tbConfig.tagSorting);

      // console.log('tagItm: ',tagItm);
      // console.log('fldWrapper: ',fldWrapper);

      tags_array[fldId].splice(tags_array[fldId].indexOf(itmName), 1);
      tagItm.remove();
      tb_removeTagFromHiddenField(fldInput,tags_array[fldId]);

      if ( tags_array[fldId] == 0 ) {
         fldMsg.removeClass('d-none');
         tagBin.addClass('d-none');
      }

      if ( tbConfig.tagSorting == 1 )
         sortable(fldInput); // Refresh the Sortable Container
   });

   $('.tagBuilderShowBtn').click(function() {
       var fldBtn = $(this);
       var fldWrapper = fldBtn.parents('.tagBuilderWrapper');
       var fldInput = fldWrapper.find('.tagBuilder');

       if ( fldInput.hasClass('d-none') ) {
          fldInput.removeClass('d-none');
          fldBtn.find('.tagBuilderShowEye').removeClass('fa-eye').addClass('fa-eye-slash');
          fldBtn.find('.tagBuilderShowArrow').removeClass('fa-caret-down').addClass('fa-caret-up');
          fldBtn.find('span').text('Hide Raw Tag List');
       }
       else {
         fldInput.addClass('d-none');
         fldBtn.find('.tagBuilderShowEye').removeClass('fa-eye-slash').addClass('fa-eye');
         fldBtn.find('.tagBuilderShowArrow').removeClass('fa-caret-up').addClass('fa-caret-down');
         fldBtn.find('span').text('Show Raw Tag List');
       }
   });

});

function tb_addTag(field,container,msgdiv,addfield,event) {

   // console.log('ADD TAG: event.keyCode:', event.keyCode);
   //console.log('field: ', field);
   // console.log('container: ', container);
   // console.log('msgdiv: ', msgdiv);
   // console.log('addfield: ', addfield);

   var field_id = field.attr('id');
   // var sort_tags = field.data('tagsorting');
   // var autocomplete = field.data('autocomplete');
   // var tagCase = field.data('tagcase');

   //tbConfig.tagSorting = field.data('tagsorting');
   //tbConfig.autoComplete = field.data('autocomplete');
   //tbConfig.tagCase = field.data('tagcase');

   // Get the set config options
   tb_autoComplete(field);
   tb_tagSorting(field);
   //console.log('autoComplete: ',tbConfig.autoComplete);
   //console.log('tagSorting: ',tbConfig.tagSorting);

   var new_tag = addfield.val().trim();

   //console.log('new_tag: ', new_tag);
//debugger;

   if ( event.keyCode == 13 ) {
      event.preventDefault();
      event.stopPropagation();

      //let index = tags_array[field_id].indexOf(new_tag);
      //console.log('index:', index);

      if ( new_tag === "" ) {
          //alert("please enter a tag!");
          bootbox.alert({
                  title: "Tag Builder Error!",
                  message: "Please enter a tag!",
                  backdrop: true
               });
      }
      else if ( tags_array[field_id].indexOf(new_tag) > -1 ) {
          //alert("must be a unique tag!");
          //addfield.val("");
           bootbox.alert({
                  title: "Tag Builder Error!",
                  message: "Tag must be a unique!",
                  backdrop: true
               });
      }
      else {
          tags_array[field_id].push(new_tag);

          tb_renderTag(field,container,new_tag);
          tb_addTagToHiddenField(field,tags_array[field_id]);
          addfield.val('');

          if ( tags_array[field_id].length ) {
             msgdiv.addClass('d-none');
             container.removeClass('d-none');
          }

         // Is this needed??
         //if ( tbConfig.tagSorting == 1)
         //sortable(container); // Refresh the Sortable Container

         // If autocomplete is enabled
         if ( tbConfig.autoComplete )
            addfield.parents('.typeahead__container ').removeClass('cancel');
      }

      //console.log('tags_array:', field_id, tags_array[field_id]);
   }
}

function tb_renderTag(field,container,tagText) {  // ,sortTags,tagColor
   tagText = typeof tagText !== 'undefined' ? tagText : 'New Tag';
   // sortTags = typeof sortTags !== 'undefined' ? sortTags : 0; // Set to true of sortable option is set
   //tagColor = typeof tagColor !== 'undefined' ? tagColor : '';

   var fieldID = field.attr('id');
   var regex = /[^A-Za-z0-9]/g;
   var tagTextID = tagText.replace(regex, "-");
   var tagID = fieldID + '_' + tagTextID;
   var tagClassList = '';
   var titleAttr = ' title="Tag: ' + tagText + '"';

   // var tagCase = field.data('tagcase');
   // tbConfig.tagCase = field.data('tagcase');
   // tbConfig.tagSorting = field.data('tagsorting');

   // Get the set config options
   tb_tagSorting(field);
   tb_tagCase(field);
   tb_tagClass(field);
   //console.log("tagSorting: ", tbConfig.tagSorting);

   console.log("tagCase: ", tbConfig.tagCase);

   if ( tagText.length > 0 ) {
      if ( tbConfig.tagCase === 'lower' )
         tagText = tagText.toLowerCase();
      else if ( tbConfig.tagCase === 'upper' )
         tagText = tagText.toUpperCase();
      else if ( tbConfig.tagCase === 'capitalize' )
         tagText = tb_capitalizeStr(tagText);
   }

   console.log("tagCase: ", tbConfig.tagCase);
   console.log('tagText: ', tagText);

   if ( tbConfig.tagSorting == 1 )
   {
      tagClassList = ' dragTag';
      titleAttr = ' title="Drag to sort tag: ' + tagText + '"';
   }

   if ( tbConfig.tagClass !== '' )
      tagClassList = tagClassList + ' ' + tbConfig.tagClass;

   // else
   //   tagClass = tagClass + ' bg-primary'

   container.append('<span id="'+tagID+'" class="tagBuilderTag badge rounded-pill p-2 me-2 mb-1'+tagClassList+'" '+titleAttr+'>' + tagText + '<i class="removeTag fa-regular fa-circle-xmark ms-2" title="Click X to remove tag: ' + tagText + '"></i></span>');

   if ( tbConfig.tagSorting == 1 )
      sortable(container); // Refresh the Sortable Container
}

function tb_autoComplete(tb_field) {
   var field = $(tb_field);

   tbConfig.autoComplete = 0;
   if ( field.data('autocomplete') )
      tbConfig.autoComplete = field.data('autocomplete');
}

function tb_tagSorting(tb_field) {
   var field = $(tb_field);

   tbConfig.tagSorting = 0;
   if ( field.data('tagsorting') )
      tbConfig.tagSorting = field.data('tagsorting');

   // console.log('tbConfig.tagSorting',tbConfig.tagSorting);
}

function tb_tagCase(tb_field) {
   var field = $(tb_field);
   var tagCase = '';

   tbConfig.tagCase = '';
   if ( field.data('tagcase') ) {
      tagCase = field.data('tagcase');
      if ( tagCase === 'lower' || tagCase === 'upper' || tagCase === 'capitalize' )
         tbConfig.tagCase = tagCase;
   }

   console.log('tbConfig.tagCase: ',tbConfig.tagCase);
}

function tb_tagClass(tb_field) {
   var field = $(tb_field);

   tbConfig.tagClass = 'bg-primary';
   if ( field.data('tagclass') )
      tbConfig.tagClass = field.data('tagclass');
}

function tb_tagHoverClass(tb_field) {
   var field = $(tb_field);

   tbConfig.tagCase = 'bg-warning';
   if ( field.data('taghoverclass') )
      tbConfig.tagHoverClass = field.data('taghoverclass');

   // console.log('tbConfig.tagHoverClass',tbConfig.tagHoverClass);
}

/*function tb_addTagItem(field,data) {

}*/

/*function tb_removeTagItem(field,data) {

}*/

function tb_addTagToHiddenField(field,data) {
   var fldValues = data.join(',');
//console.log('fldValues:', fldValues);

   field.val(fldValues).data('fieldvalue',fldValues);
}

function tb_removeTagFromHiddenField(field,data) {
   var fldValues = data.join(',');

   field.val(fldValues).data('fieldvalue',fldValues);
}

function tb_capitalizeStr(str) {
   retStr = str;
   retStr = _capitalizeStr(retStr," ");
   retStr = _capitalizeStr(retStr,"/");
   retStr = _capitalizeStr(retStr,"(");

   return retStr;
}

function _capitalizeStr(str,separator) {
   separator = typeof separator !== 'undefined' ? separator : ' ';
   const arr = str.split(separator);

   //loop through each element of the array and capitalize the first letter.
   for (var i = 0; i < arr.length; i++) {
       arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
   }

   //Join all the elements of the array back into a string  using a blankspace as a separator
   const retStr = arr.join(separator);

   return retStr;
}
