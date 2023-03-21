function zmiana(){
            
           
    if (document.getElementById('navbar').style.width == '150px') {
    document.getElementById("strzalka").style.marginLeft = '30px';
    document.getElementById("strzalka").style.transform = 'rotate(0deg)';
    document.getElementById("logo").style.width = '60px';
    document.getElementById("litery").style.display = 'none';
    setTimeout(() => {
    document.getElementById("ikony").style.display = 'block';
    document.getElementById("navbar").style.width = '80px';
    },200)

}else
{
    document.getElementById("navbar").style.width = '150px';
    document.getElementById("strzalka").style.marginLeft = '100px';
    document.getElementById("strzalka").style.transform = 'rotate(180deg)';
    document.getElementById("logo").style.width = '100px';
    document.getElementById("ikony").style.display = 'none';
    setTimeout(() => {
        document.getElementById("litery").style.display = 'block';
    },200)
}
}

function schowaj(){
    document.getElementById("jeden").style.color = 'black';
    document.getElementById("jeden2").style.color = 'black';
    document.getElementById("dwa").style.color = '';
    document.getElementById("dwa2").style.color = '';
    document.getElementById("trzy").style.color = '';
    document.getElementById("trzy2").style.color = '';
    document.getElementById("cztery").style.color = '';
    document.getElementById("cztery2").style.color = '';
    document.getElementById("pienc").style.color = '';
    document.getElementById("pienc2").style.color = '';
    document.getElementById("szesc").style.color = '';
    document.getElementById("szesc2").style.color = '';
    document.getElementById("siedem").style.color = '';
    document.getElementById("siedem2").style.color = '';
    document.getElementById("osiom").style.color = '';
    document.getElementById("osiom2").style.color = '';
}
function jeden(){
    schowaj()
    document.getElementById("jeden").style.color = '#f83439';
    document.getElementById("jeden2").style.color = '#f83439';
}
function dwa(){
    schowaj()
    document.getElementById("dwa").style.color = '#f83439';
    document.getElementById("dwa2").style.color = '#f83439';

}
function trzy(){
    schowaj()
    document.getElementById("trzy").style.color = '#f83439';
    document.getElementById("trzy2").style.color = '#f83439';
}

function cztery(){
    schowaj()
    document.getElementById("cztery").style.color = '#f83439';
    document.getElementById("cztery2").style.color = '#f83439';
}

function pienc(){
    schowaj()
    document.getElementById("pienc").style.color = '#f83439';
    document.getElementById("pienc2").style.color = '#f83439';
}

function szesc(){
    schowaj()
    document.getElementById("szesc").style.color = '#f83439';
    document.getElementById("szesc2").style.color = '#f83439';
}

function siedem(){
    schowaj()
    document.getElementById("siedem").style.color = '#f83439';
    document.getElementById("siedem2").style.color = '#f83439';
}

function osiom(){
    schowaj()
    document.getElementById("osiom").style.color = '#f83439';
    document.getElementById("osiom2").style.color = '#f83439';
}

