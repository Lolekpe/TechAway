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
    document.getElementById("jeden").style.backgroundColor = 'transparent';
    document.getElementById("jeden2").style.backgroundColor = 'transparent';
    document.getElementById("dwa").style.backgroundColor = '';
    document.getElementById("dwa2").style.backgroundColor = '';
    document.getElementById("trzy").style.backgroundColor = '';
    document.getElementById("trzy2").style.backgroundColor = '';
    document.getElementById("cztery").style.backgroundColor = '';
    document.getElementById("cztery2").style.backgroundColor = '';
    document.getElementById("pienc").style.backgroundColor = '';
    document.getElementById("pienc2").style.backgroundColor = '';
    document.getElementById("szesc").style.backgroundColor = '';
    document.getElementById("szesc2").style.backgroundColor = '';
    document.getElementById("siedem").style.backgroundColor = '';
    document.getElementById("siedem2").style.backgroundColor = '';
    document.getElementById("osiom").style.backgroundColor = '';
    document.getElementById("osiom2").style.backgroundColor = '';
}
function jeden(){
    schowaj()
    document.getElementById("jeden").style.backgroundColor = '#f83439';
    document.getElementById("jeden2").style.backgroundColor = '#f83439';
}
function dwa(){
    schowaj()
    document.getElementById("dwa").style.backgroundColor = '#f83439';
    document.getElementById("dwa2").style.backgroundColor = '#f83439';

}
function trzy(){
    schowaj()
    document.getElementById("trzy").style.backgroundColor = '#f83439';
    document.getElementById("trzy2").style.backgroundColor = '#f83439';
}

function cztery(){
    schowaj()
    document.getElementById("cztery").style.backgroundColor = '#f83439';
    document.getElementById("cztery2").style.backgroundColor = '#f83439';
}

function pienc(){
    schowaj()
    document.getElementById("pienc").style.backgroundColor = '#f83439';
    document.getElementById("pienc2").style.backgroundColor = '#f83439';
}

function szesc(){
    schowaj()
    document.getElementById("szesc").style.backgroundColor = '#f83439';
    document.getElementById("szesc2").style.backgroundColor = '#f83439';
}

function siedem(){
    schowaj()
    document.getElementById("siedem").style.backgroundColor = '#f83439';
    document.getElementById("siedem2").style.backgroundColor = '#f83439';
}

function osiom(){
    schowaj()
    document.getElementById("osiom").style.backgroundColor = '#f83439';
    document.getElementById("osiom2").style.backgroundColor = '#f83439';
}

