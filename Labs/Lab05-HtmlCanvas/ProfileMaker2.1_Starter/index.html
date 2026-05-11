<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Profile Maker Starter</title>
  <!-- Google Fonts for the Font Picker -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Dancing+Script:wght@700&family=Oswald:wght@700&family=Roboto:wght@900&display=swap" rel="stylesheet">
</head>

<body>

  <div class="container-fluid">
    <div class="row">

      <!-- Hidden image element used as the source for canvas drawing -->
      <img id="hiddenImage" src="" style="display:none" alt="Hidden image">

      <div class="col-md-8 d-flex align-items-center justify-content-center p-3">
        <canvas id="canvas">
          <!--- Show this message if <canvas> is not recognized -->
          Canvas not supported in your browser.
        </canvas>
      </div>

      <div class="col-md-4 d-flex flex-column align-items-center p-3">

        <div class="mb-3 w-75">
          <label for="image" class="form-label">Your Photo:</label>
          <input type="file" id="image" class="form-control" accept=".png,.jpg,.jpeg">
        </div>

        <div class="mb-3 w-75">
          <label for="topText" class="form-label">Top Text:</label>
          <input type="text" id="topText" class="form-control" placeholder="Top text">
        </div>

        <div class="mb-3 w-75">
          <label for="bottomText" class="form-label">Bottom Text:</label>
          <input type="text" id="bottomText" class="form-control" placeholder="Bottom text">
        </div>

        <div class="mb-3 w-75">
          <label for="zoomRange" class="form-label">Image Zoom:</label>
          <input type="range" id="zoomRange" class="form-range" min="0.5" max="3" step="0.1" value="1">
        </div>

        <div class="mb-3 w-75">
          <label for="frameSelect" class="form-label">Border Style:</label>
          <select id="frameSelect" class="form-select">
            <option value="white">Classic White</option>
            <option value="gold">Gold Gradient</option>
            <option value="neon">Neon Glow</option>
            <option value="none">None</option>
          </select>
        </div>

        <div class="mb-3 w-75">
          <label for="badgeText" class="form-label">Badge Text:</label>
          <input type="text" id="badgeText" class="form-control" placeholder="e.g. OPEN TO WORK">
        </div>

        <div class="mb-3 w-75">
          <label for="textColor" class="form-label">Text Color:</label>
          <input type="color" id="textColor" class="form-control form-control-color w-100" value="#ffffff" title="Choose your text color">
        </div>

        <div class="mb-3 w-75">
          <label for="fontSelect" class="form-label">Text Font:</label>
          <select id="fontSelect" class="form-select">
            <option value="sans-serif">Default Sans</option>
            <option value="'Bangers', system-ui">Bangers (Comic)</option>
            <option value="'Oswald', sans-serif">Oswald (Bold)</option>
            <option value="'Dancing Script', cursive">Dancing Script</option>
            <option value="'Roboto', sans-serif">Roboto Black</option>
          </select>
        </div>

        <div class="mb-3 w-75">
          <label for="fontSize" class="form-label">Font Size:</label>
          <input type="range" id="fontSize" class="form-range" min="20" max="80" step="1" value="42">
        </div>

        <div class="mb-3 w-75">
          <label for="textOutline" class="form-label">Text Outline:</label>
          <select id="textOutline" class="form-select">
            <option value="none">None</option>
            <option value="black">Black</option>
            <option value="white">White</option>
          </select>
        </div>

        <div class="mb-3 w-75">
          <label for="filterSelect" class="form-label">Choose a Filter:</label>
          <select id="filterSelect" class="form-select">
            <option value="none">None</option>
            <option value="grayscale">Grayscale</option>
            <option value="sepia">Sepia</option>
            <option value="invert">Invert</option>
            <option value="sharpen">Sharpen</option>
            <option value="gaussian">Blur (Gaussian)</option>
            <option value="noise">Noise</option>
          </select>
        </div>

        <hr class="w-75">
        <h5>Stickers</h5>
        <p class="small text-muted">Click the canvas to place a sticker!</p>
        <div class="mb-3 w-75">
          <label for="stickerText" class="form-label">Sticker Text:</label>
          <input type="text" id="stickerText" class="form-control mb-2" placeholder="e.g. 🚀" value="✅">
          <div class="d-flex gap-2 mb-2 flex-wrap">
            <button class="btn btn-outline-secondary btn-sm emoji-btn" type="button">🚀</button>
            <button class="btn btn-outline-secondary btn-sm emoji-btn" type="button">🔥</button>
            <button class="btn btn-outline-secondary btn-sm emoji-btn" type="button">✅</button>
            <button class="btn btn-outline-secondary btn-sm emoji-btn" type="button">❤️</button>
            <button class="btn btn-outline-secondary btn-sm emoji-btn" type="button">🌟</button>
            <button class="btn btn-outline-secondary btn-sm emoji-btn" type="button">👑</button>
          </div>
          <button id="clearStickers" class="btn btn-outline-danger btn-sm">Clear All Stickers</button>
        </div>

        <hr class="w-75">
        <h5>Freestyle Drawing</h5>
        <div class="mb-3 w-75">
          <div class="btn-group w-100 mb-2" role="group">
            <input type="radio" class="btn-check" name="editMode" id="modePan" value="pan" checked>
            <label class="btn btn-outline-primary" for="modePan">Edit Photo</label>
            <input type="radio" class="btn-check" name="editMode" id="modeDraw" value="draw">
            <label class="btn btn-outline-primary" for="modeDraw">Draw</label>
          </div>
          <div class="row g-2 mb-2">
            <div class="col-6">
              <label for="penColor" class="form-label small">Color:</label>
              <input type="color" id="penColor" class="form-control form-control-sm form-control-color w-100" value="#ff0000">
            </div>
            <div class="col-6">
              <label for="penSize" class="form-label small">Size:</label>
              <input type="range" id="penSize" class="form-range" min="1" max="20" value="5">
            </div>
          </div>
          <button id="clearDrawing" class="btn btn-outline-danger btn-sm w-100">Clear Drawing</button>
        </div>

        <a class="btn btn-primary mt-2" id="downloadPic" href="#" download="profile.png">Download</a>

      </div>

    </div>
  </div>

  <script type="module" src="./src/js/main.js"></script>
</body>

</html>
