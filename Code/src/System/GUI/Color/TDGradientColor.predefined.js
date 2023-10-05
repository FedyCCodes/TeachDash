// TDGradientColor.predefined.js

TDGradientColor.bluePurple = new TDGradientColor({ color1: TDColor.bluePurple1, color2: TDColor.bluePurple2, className: "blue-purple" });
TDGradientColor.orange = new TDGradientColor({ color1: TDColor.orange1, color2: TDColor.orange2, className: "orange" });
TDGradientColor.gray = new TDGradientColor({ color1: TDColor.gray1, color2: TDColor.gray2, className: "gray"  });
TDGradientColor.roseRed = new TDGradientColor({ color1: TDColor.roseRed1, color2: TDColor.roseRed2, className: "rose-red"  });
TDGradientColor.darkGreen = new TDGradientColor({ color1: TDColor.darkGreen1, color2: TDColor.darkGreen2, className: "dark-green" });
TDGradientColor.magentaPurple = new TDGradientColor({ color1: TDColor.magentaPurple1, color2: TDColor.magentaPurple2, className: "magenta-purple" });
TDGradientColor.lightBlue = new TDGradientColor({ color1: TDColor.lightBlue1, color2: TDColor.lightBlue2, className: "light-blue" });
TDGradientColor.purpleGreen = new TDGradientColor({ color1: TDColor.purpleGreen1, color2: TDColor.purpleGreen, className: "purple-green" });
TDGradientColor.lightYellow = new TDGradientColor({ color1: TDColor.lightYellow1, color2: TDColor.lightYellow2, className: "light-yellow" });
TDGradientColor.limeGreen = new TDGradientColor({ color1: TDColor.limeGreen1, color2: TDColor.limeGreen2, className: "lime-green" });
TDGradientColor.white = new TDGradientColor({ color1: TDColor.white, color2: TDColor.white, className: "white" });
TDGradientColor.whiteGradient = new TDGradientColor({ color1: TDColor.whiteGradient1, color2: TDColor.whiteGradient2, className: "white-gradient" });

TDGradientColor.darkGray = new TDGradientColor({ color1: TDColor.darkGray, color2: TDColor.darkGray, className: "dark-gray" });

TDGradientColor.darkGrayGradient = new TDGradientColor({ color1: TDColor.darkGrayGradient1, color2: TDColor.darkGrayGradient2, className: "dark-gray-gradient" });

TDGradientColor.clearMiddleColor = new TDGradientColor({ color1: TDGradientColor.white.color1.getAdd(TDGradientColor.darkGray.color1), color2: TDGradientColor.white.color2.getAdd(TDGradientColor.darkGray.color2) });
TDGradientColor.clearMiddleColor.color1.alpha = TDGradientColor.clearMiddleColor.color2.alpha = 0;
