import gsap from "gsap";

export interface LuckyJetOptions {
  glidePointX?: number;
  glidePointY?: number;
  svgOffsetX?: number;
  svgOffsetY?: number;
  svgCurve?: number;
  glideOffsetX?: number;
  glideOffsetY?: number;
  stage1Duration?: number;
  stage2Duration?: number;
  stage3Duration?: number;
}

export function createLuckyJet(userOptions: LuckyJetOptions = {}) {
  const defaultOptions: LuckyJetOptions = {
    glidePointX: 80,
    glidePointY: 30,
    svgOffsetX: 30,
    svgOffsetY: 60,
    glideOffsetX: 7,
    glideOffsetY: 5,
    svgCurve: 66,
    stage1Duration: 2,
    stage2Duration: 1,
    stage3Duration: 0.4,
  };

  const options = { ...defaultOptions, ...userOptions };

  const canvas = document.querySelector(".lucky-jet") as HTMLElement;
  const pilot = document.querySelector(".lucky-jet__pilot") as HTMLElement;
  const svgStroke = document.querySelector(
    ".lucky-jet__svg-stroke"
  ) as SVGElement;
  const svgGrad = document.querySelector(".lucky-jet__svg-grad") as SVGElement;
  console.log(canvas, "canvas");

  let animating = false;
  let timeline: gsap.core.Timeline;
  let flyOutTween: gsap.core.Tween;
  let canvasWidth: number;
  let canvasHeight: number;
  let canvasDiagonal: number;
  let pilotSize: number;
  let glideOffsetX: number;
  let glideOffsetY: number;
  let glideCoords: {
    pilotX: number;
    pilotY: number;
    svgX: number;
    svgY: number;
  };
  let curve: number;

  function updateSizes() {
    canvasWidth = canvas?.clientWidth ?? 0;
    canvasHeight = canvas?.clientHeight ?? 0;
    canvasDiagonal = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2);
    pilotSize = pilot?.clientWidth ?? 0;
    glideOffsetX = getPercentRatio(options.glideOffsetX!, canvasWidth);
    glideOffsetY = getPercentRatio(options.glideOffsetY!, canvasHeight);

    const pilotGlidePointX =
      getPercentRatio(options.glidePointX!, canvasWidth) - pilotSize / 2;
    const pilotGlidePointY =
      getPercentRatio(options.glidePointY!, canvasHeight) - pilotSize / 2;

    const svgGlidePointX =
      pilotGlidePointX + getPercentRatio(options.svgOffsetX!, pilotSize);
    const svgGlidePointY =
      pilotGlidePointY + getPercentRatio(options.svgOffsetY!, pilotSize);

    curve = getPercentRatio(options.svgCurve!, svgGlidePointX);

    glideCoords = {
      pilotX: pilotGlidePointX,
      pilotY: pilotGlidePointY,
      svgX: svgGlidePointX,
      svgY: svgGlidePointY,
    };
  }

  function createAnimation() {
    timeline = gsap.timeline({ paused: true });

    // stage 1
    timeline
      .fromTo(
        pilot,
        {
          x: -getPercentRatio(options.svgOffsetX!, pilotSize),
          y: canvasHeight - getPercentRatio(options.svgOffsetY!, pilotSize),
        },
        {
          duration: options.stage1Duration,
          x: glideCoords.pilotX,
          y: glideCoords.pilotY,
        }
      )
      .fromTo(
        svgGrad,
        { attr: { d: animateSvg("gradient", 0, 0, canvasHeight) } },
        {
          duration: options.stage1Duration,
          attr: {
            d: animateSvg(
              "gradient",
              curve,
              glideCoords.svgX,
              glideCoords.svgY
            ),
          },
        },
        "<"
      )
      .fromTo(
        svgStroke,
        { attr: { d: animateSvg("stroke", 0, 0, canvasHeight) } },
        {
          duration: options.stage1Duration,
          attr: {
            d: animateSvg("stroke", curve, glideCoords.svgX, glideCoords.svgY),
          },
        },
        "<"
      );

    // stage 2
    let randomCoords = getRandomCoords();

    timeline
      .to(pilot, {
        repeat: -1,
        duration: options.stage2Duration,
        ease: "none",
        x: () => randomCoords.x,
        y: () => randomCoords.y,
        repeatRefresh: true,
      })
      .to(
        svgGrad,
        {
          repeat: -1,
          duration: options.stage2Duration,
          ease: "none",
          repeatRefresh: true,
          attr: {
            d: () =>
              animateSvg(
                "gradient",
                curve,
                randomCoords.svgX,
                randomCoords.svgY
              ),
          },
        },
        "<"
      )
      .to(
        svgStroke,
        {
          repeat: -1,
          duration: options.stage2Duration,
          ease: "none",
          repeatRefresh: true,
          attr: {
            d: () =>
              animateSvg("stroke", curve, randomCoords.svgX, randomCoords.svgY),
          },
          onStart: () => {
            randomCoords = getRandomCoords();
          },
          onRepeat: () => {
            randomCoords = getRandomCoords();
          },
        },
        "<"
      );
  }

  function flyOut() {
    if (flyOutTween) flyOutTween.kill();

    const x = gsap.getProperty(pilot, "x") as number;
    const y = gsap.getProperty(pilot, "y") as number;
    const distanceLeftX = canvasWidth - x;
    const distanceLeftY = y;
    const distanceLeft = Math.sqrt(distanceLeftX ** 2 + distanceLeftY ** 2);
    const distanceLeftPercent = (distanceLeft * 100) / canvasDiagonal;
    const duration = getPercentRatio(
      distanceLeftPercent,
      options.stage3Duration!
    );

    flyOutTween = gsap.to(pilot, {
      duration: duration,
      ease: "none",
      x: canvasWidth,
      y: 0,
      repeatRefresh: true,
      onComplete: () => {
        canvas.classList.remove("_animating");
      },
    });
  }

  function getRandomCoords() {
    const pilotGlideX = glideCoords.pilotX + rand(glideOffsetX);
    const pilotGlideY = glideCoords.pilotY + rand(glideOffsetY);

    return {
      x: pilotGlideX,
      y: pilotGlideY,
      svgX: pilotGlideX + getPercentRatio(options.svgOffsetX!, pilotSize),
      svgY: pilotGlideY + getPercentRatio(options.svgOffsetY!, pilotSize),
    };
  }

  function animateSvg(
    type: "stroke" | "gradient",
    curve: number,
    x: number,
    y: number
  ) {
    switch (type) {
      case "stroke":
        return `M 0 ${canvasHeight} Q ${curve} ${canvasHeight} ${x} ${y}`;
      case "gradient":
        return `M 0 ${canvasHeight} Q ${curve} ${canvasHeight} ${x} ${y} L ${x} ${canvasHeight} Z`;
    }
  }

  function getPercentRatio(percent: number, base: number) {
    return (percent * base) / 100;
  }

  function rand(num: number) {
    return Math.random() * (num + num) - num;
  }

  function onResize() {
    const progress = timeline.progress();

    timeline.kill();
    updateSizes();
    createAnimation();
    timeline.progress(progress);

    if (animating) {
      timeline.play();
    }
  }

  function start() {
    canvas?.classList?.add("_animating");
    if (flyOutTween) flyOutTween.kill();
    timeline.invalidate().restart();
    animating = true;
  }

  function end() {
    timeline.pause();
    flyOut();
    animating = false;

    console.log("end");
    console.log("animating", animating);
  }

  updateSizes();
  createAnimation();

  window.addEventListener("resize", onResize);

  return { start, end, updateSizes };
}
