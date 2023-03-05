<!---
   controls.cfc
--->
<cfcomponent displayname="controls" extends="base" hint="">

   <!---
      renderTagListInputField(fieldName,fieldID,fieldPrefix,fieldLabel,fieldClass,labelClass,requiredfield,placeholder,fieldValue,readonly)
   --->
   <cffunction name="renderTagListInputField" access="public" ajaxAPI="0" output="yes" returntype="void">
      <cfargument name="fieldName" type="string" required="yes">
      <cfargument name="fieldID" type="string" required="false" default="#arguments.fieldName#">
      <cfargument name="fieldPrefix" type="string" required="false" default="">
      <cfargument name="fieldLabel" type="string" required="false" default="#arguments.fieldName#">
      <cfargument name="fieldClass" type="string" required="false" default="">
      <cfargument name="labelClass" type="string" required="false" default="">
      <cfargument name="requiredfield" type="boolean" required="false" default="false">
      <cfargument name="placeholder" type="string" required="false" default="#arguments.fieldLabel#">
      <cfargument name="autoComplete" type="boolean" required="false" default="false">
      <cfargument name="fieldValue" type="string" required="false" default="">
      <cfargument name="readonly" type="boolean" required="false" default="false">
      <cfargument name="tagCase" type="string" required="false" default="" hint="force tags case: lowercase,uppercase,capitalize">
      <!---<cfargument name="useLowerCaseTags" type="boolean" required="false" default="false" hint="force lower case tags">--->
      <cfargument name="enableTagSorting" type="boolean" required="false" default="false" hint="enforce tag validation">
      <cfargument name="validateTags" type="string" required="false" default="" hint="enforce tag validation">
      <cfargument name="addFieldClass" type="string" required="false" default="">
      <cfargument name="messageText" type="string" required="false" default="No Tags Added!">

      <cfscript>
         var req = arguments.requiredfield;

         arguments.fieldName = TRIM(arguments.fieldName);
         if ( LEN(TRIM(arguments.fieldPrefix)) )
            arguments.fieldID = TRIM(TRIM(arguments.fieldPrefix) & '_' & TRIM(arguments.fieldID));
         arguments.labelClass = TRIM(arguments.labelClass);

         if ( req )
         {
            arguments.labelClass = arguments.labelClass & ' required';
            if ( LEN(TRIM(arguments.placeholder)) AND LEN(TRIM(arguments.fieldLabel)) EQ 0 )
               arguments.placeholder = arguments.placeholder & " *";
         }

         req = ( req ) ? 1 : 0;
         arguments.readonly = ( arguments.readonly ) ? 1 : 0;
         arguments.enableTagSorting = ( arguments.enableTagSorting ) ? 1 : 0;
         arguments.autocomplete = ( arguments.autocomplete ) ? 1 : 0;
         //arguments.useLowerCaseTags = ( arguments.useLowerCaseTags ) ? 1 : 0;
         //arguments.validateTags = ( arguments.validateTags ) ? 1 : 0;
      </cfscript>

      <div class="tagBuilderWrapper #arguments.fieldClass#">
         <label class="tagBuilderFieldLabel #arguments.labelClass#">#arguments.fieldLabel#</label>
         <input type="text" id="#arguments.fieldID#_add" name="#arguments.fieldName#_add" class="tagBuilderAdd form-control-sm #arguments.addFieldClass#" placeholder="#arguments.placeholder#">

      <div id="#arguments.fieldID#_msg" class="tagBuilderMsg"><cfif LEN(TRIM(arguments.messageText))>#arguments.messageText#</cfif></div>
         <div id="#arguments.fieldID#_bin" class="tagBuilderBin"></div>
         <input type="hidden" id="#arguments.fieldID#" name="#arguments.fieldName#" class="tagBuilder" value=""
            data-fieldvalue="#arguments.fieldValue#"
            data-required="#req#"
            data-readonly="#arguments.readonly#"
            data-autocomplete="#arguments.autocomplete#"
            data-tagCase="#arguments.tagCase#"
            <!---data-lowercasetags="#arguments.useLowerCaseTags#"--->
            data-tagsorting="#arguments.enableTagSorting#"
            data-validatetags="#arguments.validateTags#">

         <!---<div class="row d-flex">
            <div class="col"></div>
            <div class="col-3 d-flex justify-content-end">
               <button type="button" id="#arguments.fieldID#_showbtn" class="btn btn-secondary btn-sm text-right tagBuilderShowBtn"><i class="fa-regular fa-eye mr-2 tagBuilderShowEye"></i><span>Show Raw Tag List</span><i class="fa-solid fa-caret-down ml-2 tagBuilderShowArrow"></i></button>
            </div>
         </div>--->
      </div>
   </cffunction>

    <!---
      renderTagListTypeAheadInputField(fieldName,fieldID,fieldPrefix,fieldLabel,fieldClass,labelClass,required,placeholder,fieldValue,readonly)
   --->
   <cffunction name="renderTagListTypeAheadInputField" access="public" ajaxAPI="0" output="yes" returntype="void">
      <cfargument name="fieldName" type="string" required="yes">
      <cfargument name="fieldID" type="string" required="false" default="#arguments.fieldName#">
      <cfargument name="fieldPrefix" type="string" required="false" default="">
      <cfargument name="fieldLabel" type="string" required="false" default="#arguments.fieldName#">
      <cfargument name="fieldClass" type="string" required="false" default="">
      <cfargument name="labelClass" type="string" required="false" default="">
      <cfargument name="requiredfield" type="boolean" required="false" default="false">
      <cfargument name="placeholder" type="string" required="false" default="#arguments.fieldLabel#">
      <cfargument name="autocomplete" type="boolean" required="false" default="true">
      <cfargument name="fieldValue" type="string" required="false" default="">
      <cfargument name="readonly" type="boolean" required="false" default="false">
      <cfargument name="tagCase" type="string" required="false" default="" hint="force tags case: lowercase,uppercase,capitalize">
      <!---<cfargument name="useLowerCaseTags" type="boolean" required="false" default="false" hint="force lower case tags">--->
      <cfargument name="enableTagSorting" type="boolean" required="false" default="false" hint="enforce tag validation">
      <cfargument name="validateTags" type="string" required="false" default="" hint="enforce tag validation">
      <cfargument name="addFieldClass" type="string" required="false" default="">
      <cfargument name="messageText" type="string" required="false" default="No Tags Added!">

      <cfscript>
         var req = arguments.requiredfield;

         arguments.fieldName = TRIM(arguments.fieldName);
         if ( LEN(TRIM(arguments.fieldPrefix)) )
            arguments.fieldID = TRIM(TRIM(arguments.fieldPrefix) & '_' & TRIM(arguments.fieldID));
         arguments.labelClass = TRIM(arguments.labelClass);

         if ( req )
         {
            arguments.labelClass = arguments.labelClass & ' required';
            if ( LEN(TRIM(arguments.placeholder)) AND LEN(TRIM(arguments.fieldLabel)) EQ 0 )
               arguments.placeholder = arguments.placeholder & " *";
         }

         req = ( req ) ? 1 : 0;
         arguments.readonly = ( arguments.readonly ) ? 1 : 0;
         arguments.enableTagSorting = ( arguments.enableTagSorting ) ? 1 : 0;
         arguments.autocomplete = ( arguments.autocomplete ) ? 1 : 0;
         //arguments.useLowerCaseTags = ( arguments.useLowerCaseTags ) ? 1 : 0;
         //arguments.validateTags = ( arguments.validateTags ) ? 1 : 0;
      </cfscript>

      <div class="tagBuilderWrapper #arguments.fieldClass#">
         <label class="tagBuilderFieldLabel #arguments.labelClass#">#arguments.fieldLabel#</label>
         <div class="typeahead__container">
           <div class="typeahead__field">
               <div class="typeahead__query">
                   <input type="text" id="#arguments.fieldID#_add" name="#arguments.fieldName#_add" class="tagBuilderAdd #arguments.addFieldClass#" placeholder="#arguments.placeholder#" autocomplete="off">
               </div>
               <!---<div class="typeahead__button">
                   <button type="button">
                       <i class="typeahead__search-icon"></i>
                   </button>
               </div>--->
           </div>
         </div>

         <!--- TODO: Create common function for tagBuilderBin and Hidden field  --->
         <div id="#arguments.fieldID#_msg" class="tagBuilderMsg"><cfif LEN(TRIM(arguments.messageText))>#arguments.messageText#</cfif></div>
         <div id="#arguments.fieldID#_bin" class="tagBuilderBin"><!--- Tag Area ---></div>
         <input type="text" id="#arguments.fieldID#" name="#arguments.fieldName#" class="tagBuilder d-none" value=""
            data-fieldvalue="#arguments.fieldValue#"
            data-required="#req#"
            data-readonly="#arguments.readonly#"
            data-autocomplete="#arguments.autocomplete#"
            data-tagCase="#arguments.tagCase#"
            <!---data-lowercasetags="#arguments.useLowerCaseTags#"--->
            data-tagsorting="#arguments.enableTagSorting#"
            data-validatetags="#arguments.validateTags#">

         <!---<div class="row d-flex">
            <div class="col"></div>
            <div class="col-3 d-flex justify-content-end">
               <button type="button" id="#arguments.fieldID#_showbtn" class="btn btn-secondary btn-sm text-right tagBuilderShowBtn"><i class="fa-regular fa-eye mr-2 tagBuilderShowEye"></i><span>Show Raw Tag List</span><i class="fa-solid fa-caret-down ml-2 tagBuilderShowArrow"></i></button>
            </div>
         </div>--->
      </div>
   </cffunction>

</cfcomponent>