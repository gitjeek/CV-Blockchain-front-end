var $template = $(document).find('.item');
var $items = $(document).find('.items');
var mainUrl = "http://203.195.172.185:3000/api/";

//
function modify_single(obj){

            var $hey = $(obj).parent().parent();
            $hey.find('.save_single').show();
            $hey.find('.save_cancle').show();
            $hey.find('.modify_single').hide();
            var profileId = $hey.find('.profileId').val();
            var new_content = "", new_type = "", new_category = "";

            $hey.find('.profile_content').removeAttr("readonly", "");
            $hey.find('.type').removeAttr("readonly", "");
            $hey.find('.category').removeAttr("readonly", "");

                //保存修改
                $hey.find('.save_single').bind('click', function() {
                        new_content = $hey.find('.profile_content').val();
                        new_type = $hey.find('.type').val();
                        new_category = $hey.find('.category').val();

                    var data = {
                        $class: "org.example.mynetwork2.Profile",
                        content: new_content,
                        type: new_type,
                        category: new_category,
                        owner: "resource:org.example.mynetwork2.Employee#1111",
                        CV: "resource:org.example.mynetwork2.CV#2466"
                    };

                    // console.log(JSON.stringify(data));
                    
                    main.doAjax({

                        url:mainUrl+"Profile/"+profileId,
                        type:'PUT',
                        data:JSON.stringify(data),
                        success:function(res,status) { 
            
                            alert("update successfully~ ");
                            $hey.find('.profile_content').attr("readonly", "readonly");
                            $hey.find('.type').attr("readonly", "readonly");
                            $hey.find('.category').attr("readonly", "readonly");
            
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
            var profileId = $hey.find('.profileId').val();

            var r=confirm("Are you sure to delete profile?");
            if (r==true){
                main.doAjax({

                    url:mainUrl+"Profile/"+profileId,
                    type:'DELETE',
                    success:function(res,status) { 
                        location.reload();
                    }
                });

            }
            
}



function getProfiles(profileId){

    var url = mainUrl+"Profile";
    if(profileId){
        url = url + "/" + profileId;
    }
    $('.item').remove();

        main.doAjax({

            url:url,
            type:'GET',
            success:function(ret) { 
                
                console.log(ret);
                

                ret.forEach(function (res) {

                    if (res) {
                        var $item = $template.clone(true);
                        $item.find('.profileId').val(res.profileId).attr("readonly","readonly");
                        $item.find('.profile_content').val(res.content).attr("readonly","readonly");
                        $item.find('.type').val(res.type).attr("readonly","readonly");
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
}

$(document).ready(function(){
        
        getProfiles();

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
                    var $profileId = $add_single.find('.profileId').val();
                    console.log($profileId);
                        if ($add_single.find('.profileId').val().length == 0) {
                            alert("profileId should not be empty!");
                            return false;
                        }
                        if ($add_single.find('.profile_content').val().length == 0) {
                            alert("content should not be empty!");
                            return false;
                        }
                        if ($add_single.find('.type').val().length == 0) {
                            alert("type should not be empty!");
                            return false;
                        }
                        if ($add_single.find('.category').val().length == 0) {
                            alert("category should not be empty!");
                            return false;
                        }

                        var data = {
                            $class: "org.example.mynetwork2.Profile",
                            profileId: $add_single.find('.profileId').val(),
                            content: $add_single.find('.profile_content').val(),
                            type: $add_single.find('.type').val(),
                            category: $add_single.find('.category').val(),
                            owner: "resource:org.example.mynetwork2.Employee#1111",
                            CV: "resource:org.example.mynetwork2.CV#2466"
                        };
                        
                        console.log(JSON.stringify(data));
                        
                        main.doAjax({
    
                            url:mainUrl+"Profile",
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

