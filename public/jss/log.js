$(function(){
	//登录和注册窗口的切换
	//1.获取两个切换的按钮 和 两个变化的窗口
	var $go_reg=$("#go_reg");
	var $go_login=$("#go_login");
	var $reg=$("#reg");
	var $login=$("#login");
	//2.添加点击事件
	$go_reg.click(function(){
		$reg.removeClass("d_none");
		$login.addClass("d_none");
	});
	$go_login.click(function(){
		$login.removeClass("d_none");
		$reg.addClass("d_none");
		window.location.reload()
	});
 

	//登录前的验证
	var unameReg=new RegExp("^[a-zA-Z][a-zA-Z0-9_]{3,10}$","ig");
	var upwdReg=new RegExp("^[0-9]{6}$","ig"); 
	var phoneReg=new RegExp("^[0-9]{11}$","ig");
	//用户名输入框^\d{n}$
	$("#login .uname,#reg .reguname").blur(function(){
		var $uname=$(this);	
		if($uname.val()!=""){	
			let bool1=unameReg.test($uname.val());
			unameReg.lastIndex = 0;//重置下一次匹配从头开始
			if(bool1){
				$uname.next().html("用户格式正确").css({"display":"block","backgroundColor":"green"});
			}else{
				$uname.next().html("用户格式错误").css({"display":"block","backgroundColor":"pink"});
				$(this).val("");
			};
		};	
	}).focus(function(){
		$(this).next("span").css({"display":"none"});
	});

	//密码输入框
	$("#login .upwd,#reg .regupwd").blur(function(){
		var $upwd=$(this);
		if($upwd.val()!=""){
			let bool2=upwdReg.test($upwd.val());
			upwdReg.lastIndex = 0;
			if(bool2){
				$upwd.next().html("密码格式正确").css({"display":"block","backgroundColor":"green"});
			}else{
				$upwd.next().html("密码格式错误").css({"display":"block","backgroundColor":"pink"});
				$upwd.val("");
			};
		};
	}).focus(function(){
		//console.log(2222)
		$(this).next().css({"display":"none"});
	});
	//图片验证码
	$("#login .comfirmBox").blur(function(){
		var $comf=$(this);
		if($comf.val()==$comf.next().html()){
			$comf.next().html("图片码正确");
		}else{
			$comf.next().html("图片码错误");
			$comf.val("");
		}
	}).focus(function(){
		//console.log(2222)
		$(this).next().html(`${parseInt(Math.random()*10000)}`);
	});
	/////////////////////////
	//登录按钮 ajax验证用户名与密码是否匹配数据库
	var $sublogin=$("#sublogin");
	var $loginBox=$(".loginBox");
	//console.log($loginBox)
	$sublogin.click(function(){
		$loginBox.css({"display":"none"});
		if($("#login .uname").val()!=""
		&&$("#login .upwd").val()!=""
		&&$("#login .comfirmBox").val()!=""){
			var uname=$("#login .uname").val();
			var upawd=$("#login .upwd").val();
			$.ajax({
				url:"http://127.0.0.1:3000/login",
				type:"post",
				data:{uname,upawd},
				dataType:"json",
				success:function(result){
					console.log(result)
					//console.log(result[0].uid)
					if(result.length==0){
						alert("用户名或密码错误");
						 setTimeout(function(){
						 	window.location.reload()
						 },3000);
					}else{
						localStorage.setItem("uid", `${result[0].uid}`);
						$(window).attr('location','./index.html');
					}
				}
			});
		}else{
			$("#login .uname").next().html("请输入信息").css({"display":"block","backgroundColor":"red"});
		}
	});
	////////////////////////
	//注册的手机号码验证
	$("#reg .regphone").blur(function(){
		var $phone=$(this);
		if($phone.val()!=""){
			let bool3=phoneReg.test($phone.val());
			upwdReg.lastIndex = 0;
			if(bool3){
				$phone.next().html("格式正确").css({"display":"block","backgroundColor":"green"});
			}else{
				$phone.next().html("手机格式错误").css({"display":"block","backgroundColor":"pink"});
				$phone.val("");
			};
		};
	}).focus(function(){
		//console.log(2222)
		$(this).next().css({"display":"none"});
	});
	//再次确认密码框
	$("#reg .regupwd1").blur(function(){
		if($(this).val()==$("#reg .regupwd").val()){			
			$(this).next().html("密码正确").css({"display":"block","backgroundColor":"green"});
			}else{
				$(this).next().html("密码错误").css({"display":"block","backgroundColor":"pink"});
				$(this).val("");
			};
	}).focus(function(){
		//console.log(2222)
		$(this).next().css({"display":"none"});
	});
	//注册按钮的 ajax点击提交事件
	var $subreg=$("#subreg");
	var $regBox=$(".regBox");
	$subreg.click(function(){
		$regBox.css({"display":"none"});
		if($("#reg .reguname").val()!=""
		&&$("#reg .regupwd").val()!=""
		&&$("#reg .regupwd1").val()!=""
		&&$("#reg .regphone").val()!=""){
			var uname=$("#reg .reguname").val();
			var upawd=$("#reg .regupwd").val();
			var phone=$("#reg .regphone").val();
			$.ajax({
				url:"http://127.0.0.1:3000/reg",
				type:"post",
				data:{uname,upawd,phone},
				dataType:"json",
				success:function(result){
					//console.log(result)
					if(result.length>0){
						alert('用户名重复');
						 setTimeout(function(){
						 	window.location.reload()
						 },3000);
					}else{
						alert("注册成功请登录");

					}
				},
			});
		}else{
			$("#reg .reguname").next().html("请输入信息").css({"display":"block","backgroundColor":"red"});
		}
	});


	////////////
});



