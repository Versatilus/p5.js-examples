var n=0,w,h,r,a,b,z=_=>[w=windowWidth,h=windowHeight],setup=_=>{createCanvas(...z());b=background;b(0);colorMode(HSL,1,1,1)},draw=_=>{a=n*2.399963;r=9*sqrt(n);fill(sin(a%1.36),1,.5);ellipse(r*cos(a)+w/2,r*sin(a)+h/2,13);n++},windowResized=_=>{resizeCanvas(...z());n=0;b(0)};