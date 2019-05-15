var $template = $(document).find('.item');
var $items = $(document).find('.items');
var mainUrl = "http://203.195.172.185:3000/api/";

//
function modify_single(obj){

            var $hey = $(obj).parent().parent();
            $hey.find('.save_single').show();
            $hey.find('.save_cancle').show();
            $hey.find('.modify_single').hide();
            var CVId = $hey.find('.CVId').val();
            var new_position = "", new_picture = "", new_category = "";

            $hey.find('.position').removeAttr("readonly", "");
            $hey.find('.picture').removeAttr("readonly", "");
            $hey.find('.category').removeAttr("readonly", "");

                //保存修改
                $hey.find('.save_single').bind('click', function() {
                        new_position = $hey.find('.position').val();
                        new_picture = $hey.find('.picture').val();
                        new_category = $hey.find('.category').val();

                    var data = {
                        $class: "org.example.mynetwork2.CV",
                        position: new_position,
                        picture: new_picture,
                        category: new_category,
                        owner: "resource:org.example.mynetwork2.Employee#1111",
                    };

                    // console.log(JSON.stringify(data));
                    
                    main.doAjax({

                        url:mainUrl+"CV/"+CVId,
                        type:'PUT',
                        data:JSON.stringify(data),
                        success:function(res,status) { 
            
                            alert("update successfully~ ");
                            $hey.find('.position').attr("readonly", "readonly");
                            $hey.find('.picture').attr("readonly", "readonly");
                            $hey.find('.category').attr("readonly", "readonly");
                            location.reload();
                        }
                    });


            });

            $hey.find('.save_cancle').bind('click',function (){
                $hey.find('.save_single').hide();
                $hey.find('.save_cancle').hide();
                $hey.find('.modify_single').show();
            });

}

//
function delete_single(obj) {

            var $hey = $(obj).parent().parent();
            var CVId = $hey.find('.CVId').val();

            var r=confirm("Are you sure to delete CV?");
            if (r==true){
                main.doAjax({

                    url:mainUrl+"CV/"+CVId,
                    type:'DELETE',
                    success:function(res,status) { 
                    }
                });
                location.reload();
            }
            
}


$(document).ready(function(){
        
        $('.item').remove();

        main.doAjax({

            url:mainUrl+"CV",
            type:'GET',
            success:function(ret) { 
                
                console.log(ret);
                

                ret.forEach(function (res) {

                    if (res) {
                        var $item = $template.clone(true);
                        $item.find('.CVId').val(res.CVId).attr("readonly","readonly");
                        $item.find('.position').val(res.position).attr("readonly","readonly");
                        $item.find('.picture').val(res.picture).attr("readonly","readonly");
                        $item.find('.category').val(res.category).attr("readonly","readonly");
                        $item.find('.modify_single').show();
                        $item.find('.save_single').show();
                        $item.find('.delete_single').show();
                        $items.append($item);
                    }


                });
                
                $('.save_single').hide();
                $('.save_cancle').hide();
            }
        });

        //add new line 
        $('.add_single').bind('click', function() {
            var $add_single = $template.clone(true);
            $items.append($add_single);
            $('.add_single').hide();
            $('.add_cancel').show();
            $('.add_save').show();

            //cancle
            $('.add_cancel').bind('click', function(){

                $add_single.remove();
                $('.add_single').show();
                $('.add_cancel').hide();
                $('.add_save').hide();

            });

            //上传一行           
            $('.add_save').bind('click', function() {
                    var $CVId = $add_single.find('.CVId').val();
                    console.log($CVId);
                        if ($add_single.find('.CVId').val().length == 0) {
                            alert("CVId should not be empty!");
                            return false;
                        }
                        if ($add_single.find('.position').val().length == 0) {
                            alert("position should not be empty!");
                            return false;
                        }
                        if ($add_single.find('.picture').val().length == 0) {
                            alert("picture should not be empty!");
                            return false;
                        }
                        if ($add_single.find('.category').val().length == 0) {
                            alert("category should not be empty!");
                            return false;
                        }

                        var data = {
                            $class: "org.example.mynetwork2.CV",
                            CVId: $add_single.find('.CVId').val(),
                            position: $add_single.find('.position').val(),
                            picture: $add_single.find('.picture').val(),
                            category: $add_single.find('.category').val(),
                            owner: "resource:org.example.mynetwork2.Employee#1111",
                        };
                        
                        console.log(JSON.stringify(data));
                        
                        main.doAjax({
    
                            url:mainUrl+"CV",
                            type:'POST',
                            data:JSON.stringify(data),
                            success:function(res,status) { 
                                alert("update successfully~ ");
                                location.reload();
                            }
                        });
            });


        });



        //
       


});

