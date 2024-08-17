document.addEventListener('DOMContentLoaded', function() {
    const names = {
        "jahrei": {
            links: ["https://instagram.com/jahreikun", "https://instagram.com/jahreipwr", "https://tiktok.com/@jahreikun", "https://youtube.com/@jahreikun"],
            image: "jahrei.png"
        },
        "zenith": {
            links: ["https://youtube.com/@zeniiyama", "https://twitter.com/zeniiyama", "https://osu.ppy.sh/users/12022047", "https://boku.tachi.ac/u/zenith"],
            image: "zenith.png"
        },
        "plasma": {
            links: ["https://youtube.com/@gd_plasma", "https://tiktok.com/@gd_plasma", "https://osu.ppy.sh/users/12022047", "https://etternaonline.com/"],
            image: "plasma.png"
        },
        "cherry": {
            links: ["https://instagram.com/cherrr.ium"],
            image: "cherry.png"
        }
    };

    // Mapping URLs to friendly names
    const urlLabels = {
        "https://instagram.com/jahreikun": "instagram | @jahreikun",
        "https://instagram.com/jahreipwr": "instagram | @jahreipwr (lifting acc)",
        "https://tiktok.com/@jahreikun": "tiktok | @jahreikun",
        "https://youtube.com/@jahreikun": "youtube | @jahreikun",

        "https://youtube.com/@zeniiyama": "youtube | @zeniiyama",
        "https://twitter.com/zeniiyama": "twitter | @zeniiyama",
        "https://osu.ppy.sh/users/12022047": "osu! | zenit",
        "https://boku.tachi.ac/u/zenith": "bokutachi (BMS) | zenith",
        
        "https://youtube.com/@gd_plasma": "youtube | @gd_plasma",
        "https://tiktok.com/@gd_plasma": "tiktok | @gd_plasma",
        "https://etternaonline.com/": "etterna | Jahrei (link N/A)",

        "https://instagram.com/cherrr.ium": "instagram | @cherrr.ium"

    };

    let currentAliasIndex = 0;
    const aliasKeys = Object.keys(names);
    updateDisplay(currentAliasIndex); // Initialize the display with the first alias

    window.changeAlias = function(direction) {
        currentAliasIndex += direction;
        if (currentAliasIndex >= aliasKeys.length) {
            currentAliasIndex = 0; // Wrap around to the first alias
        } else if (currentAliasIndex < 0) {
            currentAliasIndex = aliasKeys.length - 1; // Wrap around to the last alias
        }
        updateDisplay(currentAliasIndex); // Update the display with the new alias
    }

    function updateDisplay(index) {
        const alias = aliasKeys[index];
        document.getElementById('alias-image').src = names[alias].image;
        loadLinks(alias);
    }

    function loadLinks(alias) {
        const links = names[alias].links;
        const linkList = document.getElementById('link-list');
        linkList.innerHTML = ''; // Clear existing links
        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link;
            a.textContent = urlLabels[link] || link; // Use the label from urlLabels if available, otherwise use the link itself
            li.appendChild(a);
            linkList.appendChild(li);
        });
    }
});
