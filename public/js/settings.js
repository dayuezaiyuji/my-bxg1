define(["jquery","template","datepicker","language"], function($,template) {
    $.ajax({
        type: "get",
        url: "/api/teacher/profile",
        dataType: "json",
        success: function(data) {
            var html = template("myInfoTpl", data.result);
            $("#myInfo").html(html);
        }
    })
})
