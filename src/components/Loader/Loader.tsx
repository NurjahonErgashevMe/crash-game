import { FC, useState, useEffect } from "react";
import "./styles.scss";
import clsx from "clsx";

interface LoaderProps {
  duration?: number; // duration in seconds;
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ duration = 10, className }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, (duration - 2) * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={clsx("loader-wrapper", className)}>
      {isInitialLoading ? (
        <>
          <svg
            className="loader game__loader"
            viewBox="0 0 82 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="loader__big-lines">
              <path
                d="M79.7626 46.0635C80.5991 46.1681 81.1954 46.932 81.0591 47.7639C79.5536 56.9579 74.9059 65.3649 67.884 71.5352C60.8621 77.7056 51.9273 81.2339 42.6161 81.5448C41.7735 81.573 41.0927 80.8835 41.0965 80.0405C41.1002 79.1975 41.7871 78.5203 42.6296 78.4896C51.1941 78.177 59.4076 74.9196 65.8688 69.2419C72.33 63.5643 76.6164 55.8378 78.0275 47.3845C78.1663 46.5529 78.9261 45.9588 79.7626 46.0635Z"
                fill="#944EF5"
              ></path>
              <path
                d="M78.4324 42.6823C78.4324 41.8106 79.139 41.1039 80.0107 41.1039C80.8824 41.1039 81.5891 41.8106 81.5891 42.6823C81.5891 43.554 80.8824 44.2606 80.0107 44.2606C79.139 44.2606 78.4324 43.554 78.4324 42.6823Z"
                fill="#944EF5"
              ></path>
              <path
                d="M2.77594 36.4317C1.93943 36.327 1.3432 35.5632 1.47943 34.7312C2.98493 25.5373 7.63263 17.1303 14.6546 10.9599C21.6765 4.78954 30.6113 1.26126 39.9225 0.950288C40.765 0.922147 41.4459 1.61162 41.4421 2.45465C41.4384 3.29768 40.7515 3.97479 39.909 4.00554C31.3444 4.31815 23.131 7.57557 16.6698 13.2532C10.2085 18.9309 5.92219 26.6574 4.51106 35.1107C4.37225 35.9422 3.61246 36.5363 2.77594 36.4317Z"
                fill="#944EF5"
              ></path>
              <path
                d="M4.10596 39.8129C4.10596 40.6846 3.3993 41.3912 2.5276 41.3912C1.65589 41.3912 0.949236 40.6846 0.949236 39.8129C0.949236 38.9412 1.65589 38.2345 2.5276 38.2345C3.3993 38.2345 4.10596 38.9412 4.10596 39.8129Z"
                fill="#944EF5"
              ></path>
            </g>
            <g className="loader__little-lines">
              <path
                d="M16.7748 20.7889C16.1313 20.2514 16.0428 19.2914 16.609 18.673C21.7649 13.0403 28.7071 9.33033 36.2882 8.1881C43.8692 7.04587 51.5963 8.54567 58.183 12.409C58.9063 12.8332 59.1046 13.7767 58.648 14.4799C58.1914 15.1832 57.2529 15.3795 56.5278 14.9586C50.5653 11.4977 43.5874 10.1589 36.7405 11.1906C29.8937 12.2222 23.62 15.5575 18.942 20.6216C18.3731 21.2375 17.4184 21.3264 16.7748 20.7889Z"
                fill="#944EF5"
              ></path>
              <path
                d="M16.4458 23.4551C16.4458 24.3268 15.7391 25.0334 14.8674 25.0334C13.9957 25.0334 13.2891 24.3268 13.2891 23.4551C13.2891 22.5834 13.9957 21.8767 14.8674 21.8767C15.7391 21.8767 16.4458 22.5834 16.4458 23.4551Z"
                fill="#944EF5"
              ></path>
              <path
                d="M65.7633 61.7057C66.4068 62.2431 66.4952 63.2032 65.9291 63.8216C60.7732 69.4542 53.831 73.1643 46.2499 74.3065C38.6689 75.4487 30.9417 73.9489 24.355 70.0856C23.6318 69.6614 23.4335 68.7179 23.8901 68.0147C24.3466 67.3114 25.2852 67.1151 26.0103 67.536C31.9727 70.9969 38.9507 72.3356 45.7976 71.304C52.6444 70.2724 58.9181 66.9371 63.5961 61.873C64.165 61.2571 65.1197 61.1682 65.7633 61.7057Z"
                fill="#944EF5"
              ></path>
              <path
                d="M66.0923 59.0395C66.0923 58.1678 66.7989 57.4612 67.6706 57.4612C68.5423 57.4612 69.249 58.1678 69.249 59.0395C69.249 59.9112 68.5423 60.6179 67.6706 60.6179C66.7989 60.6179 66.0923 59.9112 66.0923 59.0395Z"
                fill="#944EF5"
              ></path>
            </g>
            <g className="loader__jetpack">
              <path
                d="M29.5862 29.3317C29.5862 26.1354 32.1773 23.5444 35.3735 23.5444C38.5697 23.5444 41.1607 26.1354 41.1607 29.3317V37.3006V44.7182C41.1607 47.254 39.105 49.3098 36.5692 49.3098H34.1778C31.642 49.3098 29.5862 47.254 29.5862 44.7182V37.3006V29.3317Z"
                stroke="#944EF5"
                stroke-width="2.86975"
              ></path>
              <path
                d="M41.6653 29.3317C41.6653 26.1354 44.2564 23.5444 47.4526 23.5444C50.6488 23.5444 53.2398 26.1354 53.2398 29.3317V37.3006V44.7182C53.2398 47.254 51.1841 49.3098 48.6483 49.3098H46.2569C43.7211 49.3098 41.6653 47.254 41.6653 44.7182V37.3006V29.3317Z"
                stroke="#944EF5"
                stroke-width="2.86975"
              ></path>
              <path
                d="M54.6746 45.9299H60.9889C62.1667 45.9299 63.1215 44.9751 63.1215 43.7973V40.5387C63.1215 39.8486 62.7876 39.2011 62.2253 38.8011L54.6746 33.4284V45.9299Z"
                fill="#944EF5"
              ></path>
              <path
                d="M28.1514 45.9299H21.837C20.6592 45.9299 19.7044 44.9751 19.7044 43.7973V40.5387C19.7044 39.8486 20.0384 39.2011 20.6007 38.8011L28.1514 33.4284V45.9299Z"
                fill="#944EF5"
              ></path>
              <rect
                x="40.9905"
                y="30.451"
                width="2.1962"
                height="11.3189"
                transform="rotate(90 40.9905 30.451)"
                fill="#944EF5"
              ></rect>
              <rect
                x="53.0696"
                y="30.451"
                width="2.1962"
                height="11.3189"
                transform="rotate(90 53.0696 30.451)"
                fill="#944EF5"
              ></rect>
              <path
                d="M43.1868 51.8193C43.1868 52.4854 43.7267 53.0253 44.3928 53.0253H50.3432C51.0093 53.0253 51.5492 52.4854 51.5492 51.8193V49.6465H43.1868V51.8193Z"
                fill="#944EF5"
              ></path>
              <path
                d="M31.1921 51.8193C31.1921 52.4854 31.7321 53.0253 32.3981 53.0253H38.3486C39.0147 53.0253 39.5546 52.4854 39.5546 51.8193V49.6465H31.1921V51.8193Z"
                fill="#944EF5"
              ></path>
            </g>
            <g className="loader__fire">
              <path
                d="M35.8228 62.6074C35.6156 62.9663 35.0974 62.9663 34.8902 62.6074L32.7474 58.8959C31.5878 56.8874 33.0373 54.3768 35.3565 54.3768C37.6757 54.3768 39.1252 56.8874 37.9656 58.8959L35.8228 62.6074Z"
                fill="#944EF5"
              ></path>
              <path
                d="M47.8577 62.6074C47.6505 62.9663 47.1323 62.9663 46.9251 62.6074L44.7823 58.8959C43.6227 56.8874 45.0722 54.3768 47.3914 54.3768C49.7106 54.3768 51.1601 56.8874 50.0005 58.8959L47.8577 62.6074Z"
                fill="#944EF5"
              ></path>
            </g>
          </svg>
          <span className="game__waiting" data-lang="waiting">
            Ожидание ставки
          </span>
          <div
            className="straight-line-loader"
            style={
              {
                "--animation-duration": `${duration - 2}s`,
              } as React.CSSProperties
            }
          >
            <div className="line"></div>
          </div>
        </>
      ) : (
        <span className="loading-text">Ожидание</span>
      )}
    </div>
  );
};
