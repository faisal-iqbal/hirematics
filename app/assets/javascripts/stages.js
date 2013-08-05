var PROCESSING_MESSAGE = '<div id="div_loading"><span class="spinner"> Loading...</span></div>';
var is_move_stage_in_process = false;

jQuery(document).ready(function() {
    jQuery(document).click(function(e){
        var event_target_class_name = e.target.className;
        var current_stage_color = jQuery('#current_stage_color');
        
        if(event_target_class_name.indexOf('colorbox') == -1 && 
            current_stage_color.length > 0 && current_stage_color.val() != -1) {
            show_color_swatch(jQuery('#current_stage_color').val());
        }
    });
});

function make_list_sortable(final_stage_name, all_final_stages_names)
{
    Sortable.create(final_stage_name+"_stages", {
        onUpdate:function(list){
            if(!is_move_stage_in_process) {
                new Ajax.Request('/stage/stages_order', {
                    asynchronous:true,
                    evalScripts:true,
                    onComplete:function(request){
                        reorder_list();
                    },
                    parameters: Sortable.serialize(all_final_stages_names[0]+"_stages") + 
                    '&' + Sortable.serialize(all_final_stages_names[1]+"_stages") + 
                    '&' + Sortable.serialize(all_final_stages_names[2]+"_stages")
                });
            }
        }
    });
}

function make_element_draggable(element_id) {
    new Draggable(element_id, {
        revert: true
    });
}

function add_element_to_droppables(element_id, all_final_stages_names) {
    Droppables.add(element_id, {
        accept: 'movable',
        onDrop: function(draggable_element, droppable_element, event) {            
            var draggable_element_container = draggable_element.parentNode;
            var draggable_element_final_stage_name = 
            draggable_element_container.id.split('_stages')[0];
            var droppable_element_final_stage_name = 
            droppable_element.id.split('_stages_set')[0];
            
            if(draggable_element_final_stage_name != 
                droppable_element_final_stage_name) {
                
                is_move_stage_in_process = true;
                var droppable_element_ul = 
                $(droppable_element_final_stage_name + '_stages');
                droppable_element_ul.appendChild(draggable_element);
                
                make_list_sortable(draggable_element_final_stage_name, 
                    all_final_stages_names);
                make_list_sortable(droppable_element_final_stage_name, 
                    all_final_stages_names);
                
                if(draggable_element_final_stage_name != 
                    all_final_stages_names[0]) {
                    
                    show_or_hide_no_stage_list_item(
                        draggable_element_final_stage_name);
                }
            
                show_or_hide_no_stage_list_item(
                    droppable_element_final_stage_name);
            
                adjust_stages_set_height_after_move(
                    draggable_element_final_stage_name,
                    droppable_element_final_stage_name, all_final_stages_names);
            
                new Ajax.Request('/stage/move_stage', {
                    asynchronous:true,
                    evalScripts:true,
                    onComplete:function(request){
                        reorder_list();
                        is_move_stage_in_process = false;
                    },
                    parameters: 'order=' + draggable_element.id.split('_')[1] + 
                    '&final_stage_name=' + droppable_element_final_stage_name +
                    '&' + Sortable.serialize(all_final_stages_names[0]+"_stages") + 
                    '&' + Sortable.serialize(all_final_stages_names[1]+"_stages") + 
                    '&' + Sortable.serialize(all_final_stages_names[2]+"_stages")
                });
            }
        }
    });
}

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

reorder_list = function()
{
    var list = getElementsByClassName("sortable");
    
    for(var i = 0;i < list.length;i++)
    {
        list[i].id = "item_" + (i+1);
    }
}

hide_editable = function(id)
{
    Element.show("name_"+id);
    Element.show("edit_button_"+id);
    Element.show('default_'+id);
    $("update_"+id).className='hide';
    $("edit_" + id).className = '';
    Element.hide('update_message_'+id);
    var main_li = $('name_' + id).parentNode;
    main_li.style.background='';
}
show_editable = function(id)
{
    Element.hide("name_"+id);
    Element.hide("edit_button_"+id);
    Element.hide('default_'+id);
    Element.show("update_"+id);
    $("update_"+id).className='';
    $("edit_" + id).value = $("name_" + id).innerHTML;
    $("edit_" + id).focus();
    var main_li = $('name_' + id).parentNode;
    main_li.style.paddingBottom='4px';
    main_li.style.background='#DDD';
}

update_stage_title = function(id)
{
    if($("edit_" + id).value == '')
    {
        $("edit_" + id).className = 'fieldRed';
        RedBox.showInline('status_name_req_alert_popup');
        return false;
    }
    new Ajax.Request("/stage/edit_stage/" + id,
    {
        asynchronous:true,
        evalScripts:true,
        onComplete:function(request)
        {
            if(request.responseText == "done")
            {
                $("name_" + id).innerHTML = $("edit_" + id).value.escapeHTML();
            }
            hide_editable(id);
        },
        onLoading:function(request)
        {
            Element.hide('update_'+id);
            Element.show('update_message_'+id);
            $('update_message_'+id).innerHTML = PROCESSING_MESSAGE;
        },
        parameters:'text='+$('edit_'+id).value
    }
    )
}

function removeElement(id_to_remove, final_stage_name) {
    var ul = document.getElementById(final_stage_name + '_stages');
    var li = document.getElementById(id_to_remove);
    ul.removeChild(li);
    
    show_or_hide_no_stage_list_item(final_stage_name);
}

function show_or_hide_no_stage_list_item(final_stage_name) {
    var no_stage_li = document.getElementById(final_stage_name+'_no_stage_li');
     
    if(getElementsByClassName("sortable", 
        $(final_stage_name + '_stages')).length == 0) {
        no_stage_li.style.display = 'block';
    }
    else {
        no_stage_li.style.display = 'none'; 
    }
}

delete_stage = function(id, final_stage_name)
{
    if($('stage_id') != null && $('stage_id').value == -1) {
        RedBox.showInline('status_select_alert_popup');
        return;
    }
    
    RedBox.close();
    var main_li = $('name_' + id).parentNode.id;
    
    new Ajax.Request("/stage/delete_stage/" + id,
    {
        asynchronous:true,
        evalScripts:true,
        onComplete:function(request)
        {
            if(request.responseText == "done")
            {
                removeElement(main_li, final_stage_name);
                reorder_list();
            }
        },
        onLoading:function(request)
        {
            $(main_li).innerHTML = PROCESSING_MESSAGE;
        },
        parameters:'next_stage='+ ($('stage_id') ? $('stage_id').value : -1)
    }
    );
}

add_new_stage = function(final_stage_name, all_final_stages_names) // not working correctly
{
    if(trim($(final_stage_name+'_stage_name').value) == '')
    {
        $(final_stage_name+'_stage_name').className = 'fieldRed';
        RedBox.showInline('status_name_req_alert_popup');
        return false;
    }
    new Ajax.Request("/stage/add_new_stage",
    {
        asynchronous:true,
        evalScripts:true,
        onComplete:function(request)
        {
            new Ajax.Updater(final_stage_name+'_stages_set',
                '/stage/stages_setting',
                {
                    asynchronous:true,
                    evalScripts:true,
                    onComplete:function(request)
                    {
                        make_list_sortable(final_stage_name, 
                            all_final_stages_names);
                    },
                    parameters: 'final_stage_name='+final_stage_name
                });         
        },
        onLoading:function(request)
        {
            $(final_stage_name+'_stage_name').value = '';
            Element.show(final_stage_name+'_new_button');
            Element.hide(final_stage_name+'_new_detail');
            $(final_stage_name+'_stages_set').innerHTML = PROCESSING_MESSAGE;
        },
        parameters:'text='+$(final_stage_name+'_stage_name').value+'&final_stage_name='+final_stage_name
    }
    )
}
show_color_swatch = function(id)
{
    if($('current_stage_color').value == id)
    {
        $('color_swatch_div_'+$('current_stage_color').value).innerHTML = ''
        $('current_stage_color').value = -1
        return false;
    }

    if($('current_stage_color').value != -1)
    {
        $('color_swatch_div_'+$('current_stage_color').value).innerHTML = ''
    }
    $('current_stage_color').value = id
    Element.show('color_swatch_div_'+id)
    $('color_swatch_div_'+id).innerHTML = $('swatche').innerHTML
}

update_color = function(color_value)
{
    new Ajax.Request("/stage/update_stage_color/" + $('current_stage_color').value,
    {
        asynchronous:true,
        evalScripts:true,
        onComplete:function(request)
        {
        },
        parameters:'new_color='+color_value
    }
    )
    $('color_edit_'+ $('current_stage_color').value).className = 'colorbox color' + color_value
    //Element.hide('color_swatch_div_'+$('current_stage_color').value)
    $('color_swatch_div_'+$('current_stage_color').value).innerHTML = ''
    $('current_stage_color').value = -1
}

function adjust_stages_set_height(final_stage_name) {
    var stages_set = document.getElementById(final_stage_name + '_stages_set');
    stages_set.style.height = calculate_element_height(stages_set) + 'px';
}

function adjust_stages_set_height_after_move(draggable_element_final_stage_name,
    droppable_element_final_stage_name, all_final_stages_names) {
    
    var stages_set = $(draggable_element_final_stage_name + '_stages_set');
                
    if(getElementsByClassName("sortable", 
        $(draggable_element_final_stage_name + '_stages')).length == 0) {
                    
        if(draggable_element_final_stage_name == 
            all_final_stages_names[0]) {
            stages_set.style.height =  '34px';
        }
        else {
            stages_set.style.height =  '68px';
        }
    }
    else {
        stages_set.style.height = 
        (parseInt(stages_set.style.height) - 34) + 'px';
    }
                
    stages_set = $(droppable_element_final_stage_name + '_stages_set');
                    
    if(getElementsByClassName("sortable", 
        $(droppable_element_final_stage_name + '_stages')).length == 1) { 
                    
        if(droppable_element_final_stage_name == 
            all_final_stages_names[0]) {
            stages_set.style.height =  '68px';
        }
        else {
            stages_set.style.height = '34px';
        }
    }
    else {
        stages_set.style.height = 
        (parseInt(stages_set.style.height) + 34) + 'px';
    }
}