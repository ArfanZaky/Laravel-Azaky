// ---- AJAX CRUD for simple JSON type object->string ----

    $(document).ready(function(){
        Event_Tbl_Add();
        Event_Tbl_Add_Btn();
        Event_Tbl_Edit();
        Event_Tbl_Edit_Btn();
        Event_Tbl_Delete();
    });

    function Event_Tbl_Add()
    {
        var btn_save = $(".btn-save");

        btn_save.click(function(){

            // get closest parent
            var idx = btn_save.index(this);
            var parent = btn_save.eq(idx).closest(".table-data");
            var parent_id = parent.attr('id');

            var arr_key = Var_Keys(parent_id);

            var arr_result = [];

            // as a reference to loop
            var ipt = parent.find(".ipt-form1");
            
            ipt.each(function(i){

                var arr_sub = {};

                // loop by key length than set key & value to sub as an object..
                for (var j = 1; j <= arr_key.length; j++)
                    arr_sub[arr_key[j-1]] = parent.find(".ipt-form" + j).eq(i).val();

                // push to result..
                arr_result.push(arr_sub);
            });

            // push new data
            var arr_sub = {};
            for (var i = 1; i <= arr_key.length; i++)
                arr_sub[arr_key[i-1]] = $(".ipt-add-form" + i).eq(idx).val();

            // push to result..
            arr_result.push(arr_sub);

            // encode array as string JSON
            var json_string = JSON.stringify(arr_result);

            // post AJAX
            var url_target = Var_Url(parent_id);
            var obj_target = {};

            obj_target[Var_Row(parent_id)] = json_string;

            Event_POST(url_target, obj_target, parent_id, true);
        });
    }

    function Event_Tbl_Add_Btn()
    {
        var btn_add = $(".btn-add");
        var btn_add_cancel = $(".btn-add-cancel");
        var btn_save = $(".btn-save");


        btn_add.click(function(){

            var idx = btn_add.index(this);
            var parent = btn_add.eq(idx).closest(".table-data");

            var ipt_length = Var_Keys(parent.attr('id')).length;

            btn_add.eq(idx).hide();
            btn_add_cancel.eq(idx).show();
            btn_save.eq(idx).show();

            for (var i = 1; i <= ipt_length; i++) 
                $(".ipt-add-form" + i).eq(idx).show();
        });

        btn_add_cancel.click(function(){

            var idx = btn_add_cancel.index(this);
            var parent = btn_add_cancel.eq(idx).closest(".table-data");

            var ipt_length = Var_Keys(parent.attr('id')).length;

            btn_add.eq(idx).show();
            btn_add_cancel.eq(idx).hide();
            btn_save.eq(idx).hide();

            for (var i = 1; i <= ipt_length; i++) 
                $(".ipt-add-form" + i).eq(idx).hide();
        });
    }

    function Event_Tbl_Edit()
    {
        var btn_update = $(".btn-update");

        btn_update.click(function(){

            // get closest parent
            var idx = btn_update.index(this);
            var parent = btn_update.eq(idx).closest(".table-data");
            var parent_id = parent.attr('id');

            var arr_key = Var_Keys(parent_id);

            var arr_result = [];

            // as a reference to loop
            var ipt = parent.find(".ipt-form1");
            

            ipt.each(function(i){

                var arr_sub = {};

                // loop by key length than set key & value to sub as an object..
                for (var j = 1; j <= arr_key.length; j++)
                    arr_sub[arr_key[j-1]] = parent.find(".ipt-form" + j).eq(i).val();

                // push to result..
                arr_result.push(arr_sub);
            });

            // encode array as string JSON
            var json_string = JSON.stringify(arr_result);

            // post AJAX
            var url_target = Var_Url(parent_id);
            var obj_target = {};

            obj_target[Var_Row(parent_id)] = json_string;
            
            Event_POST(url_target, obj_target, parent_id, true);
        });
    }

    function Event_Tbl_Edit_Btn()
    {
        var btn_update = $(".btn-update");
        var btn_edit = $(".btn-edit");
        var btn_edit_cancel = $(".btn-edit-cancel");


        btn_edit.click(function(){

            var idx = btn_edit.index(this);
            var parent = btn_edit.eq(idx).closest(".table-data");

            idx = parent.find(".btn-edit").index(this);             // re-index by parent position
            var ipt_length = Var_Keys(parent.attr('id')).length;

            parent.find(".btn-edit").eq(idx).hide();
            parent.find(".btn-edit-cancel").eq(idx).show();

            for (var i = 1; i <= ipt_length; i++) 
            {
                parent.find(".ipt-form" + i).eq(idx).show();
                parent.find(".tab-txt" + i).eq(idx).hide();
            }

            parent.find(".btn-update").show();
        });

        btn_edit_cancel.click(function(){

            var idx = btn_edit_cancel.index(this);
            var parent = btn_edit_cancel.eq(idx).closest(".table-data");

            idx = parent.find(".btn-edit-cancel").index(this);             // re-index by parent position
            var ipt_length = Var_Keys(parent.attr('id')).length;

            parent.find(".btn-edit").eq(idx).show();
            parent.find(".btn-edit-cancel").eq(idx).hide();

            for (var i = 1; i <= ipt_length; i++) 
            {
                parent.find(".ipt-form" + i).eq(idx).hide();
                parent.find(".tab-txt" + i).eq(idx).show();
            }

            if (parent.find(".btn-edit-cancel:visible").length === 0)
                parent.find(".btn-update").hide();
        });
    }

    function Event_Tbl_Delete()
    {
        var btn_delete = $(".btn-delete");

        btn_delete.click(function(){

            // get closest parent
            var idx = btn_delete.index(this);
            var parent = btn_delete.eq(idx).closest(".table-data");
            var parent_id = parent.attr('id');

            idx = parent.find(".btn-delete").index(this);   // re-index by parent position

            var arr_key = Var_Keys(parent_id);

            var arr_result = [];

            // as a reference to loop
            var ipt = parent.find(".ipt-form1");
            

            ipt.each(function(i){

                var arr_sub = {};

                if (idx != i)
                {
                    // loop by key length than set key & value to sub as an object..
                    for (var j = 1; j <= arr_key.length; j++)
                        arr_sub[arr_key[j-1]] = parent.find(".ipt-form" + j).eq(i).val();

                    // push to result..
                    arr_result.push(arr_sub);    
                }
            });

            // encode array as string JSON
            var json_string = JSON.stringify(arr_result);

            // post AJAX
            var url_target = Var_Url(parent_id);
            var obj_target = {};

            obj_target[Var_Row(parent_id)] = json_string;

            Event_POST(url_target, obj_target, parent_id, true);
        });
    }

    function Event_POST(url_target, obj_target, id_target, reload)
    {
        $.ajax({
            type        : "POST",
            url         : url_target,
            dataType    : "JSON",
            data        : obj_target,
            success     : function(data){

                if (reload)
                {
                    // reload table
                    $("#"+id_target).load(" #"+id_target+" > *", function(){

                        // re-attached style
                        Dev_Mode();
                        Loading_Btn();

                        // re-attached event
                        Event_Tbl_Add();
                        Event_Tbl_Add_Btn();
                        Event_Tbl_Edit();
                        Event_Tbl_Edit_Btn();
                        Event_Tbl_Delete();
                    });
                }
            }
        });
    }