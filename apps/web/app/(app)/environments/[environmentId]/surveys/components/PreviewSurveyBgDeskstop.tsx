export default function PreviewSurveyBgDeskstop({ children, survey, ContentRef }) {
  return survey.surveyBackground && survey.surveyBackground.bgType === "color" ? (
    <div className="flex flex-grow flex-col overflow-y-auto rounded-b-lg" ref={ContentRef}>
      <div
        className="relative flex w-full flex-grow flex-col items-center justify-center p-4 py-6"
        style={{
          backgroundColor: survey.surveyBackground.bg || "#ffff",
          filter: survey.surveyBackground?.brightness
            ? `brightness(${survey.surveyBackground.brightness}%)`
            : "none",
        }}>
        <div className="flex h-full w-full items-center justify-center">{children}</div>
      </div>
    </div>
  ) : survey.surveyBackground && survey.surveyBackground.bgType === "animation" ? (
    <div className="flex flex-grow flex-col overflow-y-auto rounded-b-lg" ref={ContentRef}>
      <div
        className="relative flex w-full flex-grow flex-col items-center justify-center p-4 py-6"
        style={{
          background: `url(${survey.surveyBackground.bg}) no-repeat center center fixed`,
        }}>
        <video
          muted
          loop
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: survey.surveyBackground?.brightness
              ? `brightness(${survey.surveyBackground.brightness}%)`
              : "none",
          }}>
          <source src={survey.surveyBackground.bg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex h-full w-full items-center justify-center">{children}</div>
      </div>
    </div>
  ) : survey.surveyBackground && survey.surveyBackground.bgType === "image" ? (
    <div className="flex flex-grow flex-col overflow-y-auto rounded-b-lg" ref={ContentRef}>
      <div
        className="relative flex w-full flex-grow flex-col items-center justify-center p-4 py-6"
        style={{
          backgroundImage: `url(${survey.surveyBackground.bg})`,
          filter: survey.surveyBackground?.brightness
            ? `brightness(${survey.surveyBackground.brightness}%)`
            : "none",
        }}>
        <div className="flex h-full w-full items-center justify-center">{children}</div>
      </div>
    </div>
  ) : (
    <div className="flex flex-grow flex-col overflow-y-auto rounded-b-lg" ref={ContentRef}>
      <div
        className="relative flex w-full flex-grow flex-col items-center justify-center p-4 py-6"
        style={{
          backgroundColor: "#ffff",
          filter: survey.surveyBackground?.brightness
            ? `brightness(${survey.surveyBackground.brightness}%)`
            : "none",
        }}>
        <div className="flex h-full w-full items-center justify-center">{children}</div>
      </div>
    </div>
  );
}