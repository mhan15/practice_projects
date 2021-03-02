function getChapter() {
  let chapterNumber = document.getElementById("chapter-lookup").value;
  console.log(chapterNumber);
  if (chapterNumber <= 0 || chapterNumber > 985) {
    document.getElementById("chapter-num").innerText =
      "Invalid chapter number.";
    document.getElementById("chapter-title").innerText = "";
    document.getElementById("cover-img").style.visibility = "hidden";
    document.getElementById("summary-para").innerText = "";
    document.getElementById("chapter-lookup").value = "";
    document.getElementById("summary").style.visibility = "hidden";
    return;
  }

  let url = "https://onepiececover.com/api/chapters/" + chapterNumber;
  console.log(url);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);

      let cover = data.cover_images.split("|");
      document.getElementById("chapter-num").innerText = data.chapter;
      document.getElementById(
        "chapter-title"
      ).innerText = `Title: ${data.title}`;
      document.getElementById("cover-img").src = cover[0];
      document.getElementById("summary-para").innerText = data.summary;
      document.getElementById("chapter-lookup").value = "";
      document.getElementById("cover-img").style.visibility = "visible";
      document.getElementById("summary").style.visibility = "visible";
    }
  };
  xhr.send();
}
