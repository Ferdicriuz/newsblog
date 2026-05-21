/* =========================
   GET SAVED ARTICLE
========================= */

const article =
  JSON.parse(
    localStorage.getItem("selectedArticle")
  );

/* =========================
   LOAD ARTICLE
========================= */

function loadArticle(){

  if(!article){

    window.location.href = "../index.html";
    return;

  }

  /* IMAGE */
  document.getElementById("articleImage").src =
    article.urlToImage ||
    "../assets/images/fallback.jpg";

  /* TITLE */
  document.getElementById("articleTitle").innerText =
    article.title;

  /* AUTHOR */
  document.getElementById("articleAuthor").innerText =
    article.author || "StreamLine Daily";

  /* DATE */
  document.getElementById("articleDate").innerText =
    new Date(
      article.publishedAt
    ).toDateString();

  /* LINK */
  document.getElementById("articleLink").href =
    article.url;

  /* DESCRIPTION */
  document.getElementById("articleDescription").innerHTML =
    generateFullArticle(article);

}

/* =========================
   GENERATE FULL ARTICLE
========================= */

function generateFullArticle(article){

  const baseText =
    article.content ||
    article.description ||
    "No article content available.";

  /* EXPANDED ARTICLE */
  return `

    <p>
      ${baseText}
    </p>

    <p>
      This developing story continues to attract attention across different parts of the world as readers remain eager for more updates and detailed analysis surrounding the situation.
    </p>

    <p>
      According to several reports, experts believe the topic could have a major impact on global conversations in the coming weeks as more information becomes available.
    </p>

    <p>
      Analysts also suggest that public reactions have continued to grow rapidly on social media platforms, with many users sharing opinions and concerns regarding the latest developments.
    </p>

    <p>
      In recent years, stories like this have shaped conversations internationally, especially as technology and online news platforms make information spread much faster than before.
    </p>

    <p>
      Government officials and industry leaders are also expected to respond as discussions continue to evolve across multiple sectors connected to the issue.
    </p>

    <p>
      Readers are encouraged to stay updated as new reports emerge throughout the day from trusted international and local news sources.
    </p>

    <p>
      Additional updates are expected soon as journalists continue gathering verified details and eyewitness reports connected to the story.
    </p>

    <p>
      Public interest in this event has remained high due to the significance of the topic and its relevance to current global trends.
    </p>

    <p>
      Experts believe that deeper investigations may reveal more insights about the circumstances surrounding the event in the coming days.
    </p>

    <p>
      Across different regions, reactions have continued to vary as individuals and organizations share their perspectives and possible outcomes.
    </p>

    <p>
      Meanwhile, digital platforms continue to experience increased engagement as readers search for more detailed coverage and breaking updates.
    </p>

    <p>
      Media outlets worldwide are expected to continue monitoring the story closely while releasing additional verified information when available.
    </p>

    <p>
      This article remains part of StreamLine Daily’s ongoing effort to provide readers with timely, engaging, and informative news coverage.
    </p>

    <p>
      Stay connected with StreamLine Daily for more global headlines, breaking news alerts, and in-depth stories from around the world.
    </p>

  `;

}

/* =========================
   INITIALIZE
========================= */

loadArticle();