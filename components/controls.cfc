<!---
   controls.cfc
--->
<cfcomponent displayname="controls" extends="base" hint="">

   <!---
      renderTagListInputField(fieldName,fieldID,fieldPrefix,fieldLabel,fieldClass,labelClass,required,placeholder,fieldValue,readonly)
   --->
   <cffunction name="renderTagListInputField" access="public" ajaxAPI="0" output="yes" returntype="void">
      <cfargument name="fieldName" type="string" required="yes">
      <cfargument name="fieldID" type="string" required="false" default="#arguments.fieldName#">
      <cfargument name="fieldPrefix" type="string" required="false" default="">
      <cfargument name="fieldLabel" type="string" required="false" default="#arguments.fieldName#">
      <cfargument name="fieldClass" type="string" required="false" default="">
      <cfargument name="labelClass" type="string" required="false" default="">
      <cfargument name="required" type="boolean" required="false" default="false">
      <cfargument name="placeholder" type="string" required="false" default="#arguments.fieldLabel#">
      <!---<cfargument name="autoComplete" type="boolean" required="false" default="false">--->
      <cfargument name="fieldValue" type="string" required="false" default="">
      <cfargument name="readonly" type="boolean" required="false" default="false">
      <cfargument name="enableTagSorting" type="boolean" required="false" default="false" hint="enforce tag validation">
      <cfargument name="tagCase" type="string" required="false" default="" hint="force tags case: lowercase,uppercase,capitalize">
      <cfargument name="tagClass" type="string" required="false" default="" hint="">
      <cfargument name="tagHoverClass" type="string" required="false" default="" hint="">
      <cfargument name="validateTags" type="string" required="false" default="" hint="enforce tag validation">
      <cfargument name="addFieldClass" type="string" required="false" default="">
      <cfargument name="messageText" type="string" required="false" default="No Tags Added!">

      <cfargument name="showHiddenButton" type="boolean" required="false" default="false">
      <cfargument name="outputConfig" type="boolean" required="false" default="false">

      <cfscript>
         var req = arguments.required;

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
         // arguments.autocomplete = ( arguments.autocomplete ) ? 1 : 0;
         //arguments.useLowerCaseTags = ( arguments.useLowerCaseTags ) ? 1 : 0;
         //arguments.validateTags = ( arguments.validateTags ) ? 1 : 0;
      </cfscript>

      <div class="tagBuilderWrapper #arguments.fieldClass#">
         <label class="tagBuilderFieldLabel #arguments.labelClass#">#arguments.fieldLabel#</label>
         <input type="text" id="#arguments.fieldID#_add" name="#arguments.fieldName#_add" class="tagBuilderAdd form-control-sm #arguments.addFieldClass#" placeholder="#arguments.placeholder#" autocomplete="off">

      <div id="#arguments.fieldID#_msg" class="tagBuilderMsg"><cfif LEN(TRIM(arguments.messageText))>#arguments.messageText#</cfif></div>
         <div id="#arguments.fieldID#_bin" class="tagBuilderBin"></div>
         <input type="hidden" id="#arguments.fieldID#" name="#arguments.fieldName#" class="tagBuilder" value=""
            data-fieldvalue="#arguments.fieldValue#"
            data-required="#req#"
            data-readonly="#arguments.readonly#"
            data-autocomplete=0
            data-tagsorting="#arguments.enableTagSorting#"
            <cfif LEN(TRIM(arguments.tagCase))>data-tagcase="#arguments.tagCase#"</cfif>
            <cfif LEN(TRIM(arguments.tagClass))>data-tagclass="#arguments.tagClass#"</cfif>
            <cfif LEN(TRIM(arguments.TagHoverClass))>data-taghoverclass="#arguments.TagHoverClass#"</cfif>
            data-validatetags="#arguments.validateTags#">

         <cfif arguments.showHiddenButton>
            #renderShowHiddenButton(argumentCollection=arguments)#
         </cfif>
      </div>
      <cfif arguments.outputConfig>
         <cfset arguments.typeahead = false>
         #renderControlConfigOptions(argumentCollection=arguments)#
      </cfif>
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
      <cfargument name="required" type="boolean" required="false" default="false">
      <cfargument name="placeholder" type="string" required="false" default="#arguments.fieldLabel#">
      <cfargument name="autocomplete" type="boolean" required="false" default="true">
      <cfargument name="fieldValue" type="string" required="false" default="">
      <cfargument name="readonly" type="boolean" required="false" default="false">
      <cfargument name="enableTagSorting" type="boolean" required="false" default="false" hint="enforce tag validation">
      <cfargument name="tagCase" type="string" required="false" default="" hint="force tags case: lower,upper,capitalize">
      <cfargument name="tagClass" type="string" required="false" default="" hint="">
      <cfargument name="tagHoverClass" type="string" required="false" default="" hint="">
      <cfargument name="validateTags" type="string" required="false" default="" hint="enforce tag validation">
      <cfargument name="addFieldClass" type="string" required="false" default="">
      <cfargument name="messageText" type="string" required="false" default="No Tags Added!">

      <cfargument name="showHiddenButton" type="boolean" required="false" default="false">
      <cfargument name="outputConfig" type="boolean" required="false" default="false">

      <cfscript>
         var req = arguments.required;

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

         // arguments.autocomplete = ( arguments.autocomplete ) ? 1 : 0;
         //arguments.useLowerCaseTags = ( arguments.useLowerCaseTags ) ? 1 : 0;
         //arguments.validateTags = ( arguments.validateTags ) ? 1 : 0;
      </cfscript>

      <div class="tagBuilderWrapper #arguments.fieldClass#">
         <label class="tagBuilderFieldLabel #arguments.labelClass#">#arguments.fieldLabel#</label>
         <div class="typeahead__container">
           <div class="typeahead__field">
               <div class="typeahead__query">
                   <input type="text" id="#arguments.fieldID#_add" name="#arguments.fieldName#_add" class="tagBuilderAdd typeahead #arguments.addFieldClass#" placeholder="#arguments.placeholder#" autocomplete="off">
               </div>
               <!---<div class="typeahead__button">
                   <button type="button">
                       <i class="typeahead__search-icon"></i>
                   </button>
               </div>--->
           </div>
         </div>

         <div id="#arguments.fieldID#_msg" class="tagBuilderMsg"><cfif LEN(TRIM(arguments.messageText))>#arguments.messageText#</cfif></div>
         <div id="#arguments.fieldID#_bin" class="tagBuilderBin"><!--- Tag Area ---></div>
         <input type="hidden" id="#arguments.fieldID#" name="#arguments.fieldName#" class="tagBuilder" value=""
            data-fieldvalue="#arguments.fieldValue#"
            data-required="#req#"
            data-readonly="#arguments.readonly#"
            data-autocomplete=0
            data-tagsorting="#arguments.enableTagSorting#"
            <cfif LEN(TRIM(arguments.tagCase))>data-tagcase="#arguments.tagCase#"</cfif>
            <cfif LEN(TRIM(arguments.tagClass))>data-tagclass="#arguments.tagClass#"</cfif>
            <cfif LEN(TRIM(arguments.tagHoverClass))>data-taghoverclass="#arguments.TagHoverClass#"</cfif>
            data-validatetags="#arguments.validateTags#">

         <cfif arguments.showHiddenButton>
            #renderShowHiddenButton(argumentCollection=arguments)#
         </cfif>
      </div>

      <cfif arguments.outputConfig>
         <cfset arguments.typeahead = true>
         #renderControlConfigOptions(argumentCollection=arguments)#
      </cfif>
   </cffunction>

   <cffunction name="renderControlConfigOptions" access="public" output="yes" returntype="void">
      <cfargument name="fieldID" type="string" required="true">
      <cfargument name="typeahead" type="boolean" required="false" default="true">
      <cfargument name="enableTagSorting" type="boolean" required="false" default="false" hint="enforce tag validation">
      <cfargument name="tagCase" type="string" required="false" default="" hint="force tags case: lower,upper,capitalize">
      <cfargument name="tagClass" type="string" required="false" default="" hint="">
      <cfargument name="tagHoverClass" type="string" required="false" default="" hint="">

      <div id="#arguments.fieldID#_config" class="small">
         <hr class="mt-4">
         <div>Configured Options:</div>
         <ul>
            <li>TypeAhead: #YesNoFormat(arguments.typeahead)#</li>
            <li>Enable Tag Sorting: #YesNoFormat(arguments.enableTagSorting)#</li>
            <li>Tag Case: <cfif LEN(TRIM(arguments.tagCase))>#arguments.tagCase#<cfelse><em>Not Set</em></cfif></li>
            <cfif LEN(TRIM(arguments.tagClass))><li>Tag Class: #arguments.tagClass#</li></cfif>
            <cfif arguments.enableTagSorting>
               <cfif LEN(TRIM(arguments.tagHoverClass))><li>Sort Hover Class: #arguments.TagHoverClass#</li></cfif>
            </cfif>
         </ul>
      </div>
   </cffunction>

   <cffunction name="renderShowHiddenButton" access="public" output="yes" returntype="void">
      <cfargument name="fieldID" type="string" required="true">

      <div class="row d-flex">
         <div class="col"></div>
         <div class="w-50 d-flex justify-content-end">
            <button type="button" id="#arguments.fieldID#_showbtn" class="btn btn-secondary btn-sm text-right tagBuilderShowBtn"><i class="fa-regular fa-eye me-2 tagBuilderShowEye"></i><span>Show Raw Tag List</span><i class="fa-solid fa-caret-down ms-2 tagBuilderShowArrow"></i></button>
         </div>
      </div>
   </cffunction>

</cfcomponent>