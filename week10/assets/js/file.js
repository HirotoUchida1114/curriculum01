async function loadUsers() {
  const userList = document.getElementById("userList");
  const textBox = document.getElementById("textBox");

  // 安全対策: 要素が存在しない場合は処理を中断する
  if (!userList || !textBox) {
    console.error("HTMLの要素（userList または textBox）が見つかりません。HTMLの読み込み順を確認してください。");
    return;
  }

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("通信エラー: " + response.status);
    }

    const rawUsers = await response.json();

    // 外部APIを使わずにダミーデータを生成
    const users = rawUsers.map((user) => {
      const followers = Math.floor(Math.random() * 4900) + 100;
      const bio = `こんにちは、${user.name}です。${user.company.catchPhrase}をモットーに活動しています。`;

      return {
        ...user,
        followers,
        bio
      };
    });

    console.log(users);

    function renderUsers(filteredUsers) {
      userList.textContent = "";

      if (filteredUsers.length === 0) {
        userList.innerHTML = '<p class="text-xl text-gray-500">該当するユーザーが見つかりません</p>';
        return;
      }

      filteredUsers.forEach((user) => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6 items-center md:items-start";

        // 【修正】外部画像APIを使わず、グレーの円の中に名前の最初の1文字を表示する（エラー回避）
        const avatarImg = document.createElement("div");
        avatarImg.className = "w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-3xl font-bold text-gray-500 flex-shrink-0";
        avatarImg.textContent = user.name.charAt(0);

        const infoContainer = document.createElement("div");
        infoContainer.className = "flex-1 text-center md:text-left w-full";

        const name = document.createElement("h2");
        name.className = "text-4xl font-bold text-gray-800 mb-1";
        name.textContent = user.name;

        const email = document.createElement("p");
        email.className = "text-blue-600 text-lg mb-3";
        email.textContent = user.email;

        const bio = document.createElement("p");
        bio.className = "text-gray-600 text-xl mb-4 leading-relaxed";
        bio.textContent = user.bio;

        const followerCount = document.createElement("div");
        followerCount.className = "inline-block bg-gray-100 px-4 py-1.5 rounded-full text-base font-semibold text-gray-700";
        followerCount.innerHTML = `👥 フォロワー: <span class="font-bold text-gray-900">${user.followers.toLocaleString()}</span> 人`;

        infoContainer.appendChild(name);
        infoContainer.appendChild(email);
        infoContainer.appendChild(bio);
        infoContainer.appendChild(followerCount);

        card.appendChild(avatarImg);
        card.appendChild(infoContainer);
        
        userList.appendChild(card);
      });
    }

    textBox.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase().trim();

      const filtered = users.filter((user) => 
        user.name.toLowerCase().includes(keyword) || 
        user.email.toLowerCase().includes(keyword) ||
        user.bio.toLowerCase().includes(keyword)
      );

      renderUsers(filtered);
    });

    renderUsers(users);

  } catch (error) {
    userList.textContent = "データの取得に失敗しました";
    console.error("エラー詳細:", error); // エラーの具体的な原因をコンソールに出す
  }
}

// HTMLが完全に読み込まれてから実行する安全策
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadUsers);
} else {
  loadUsers();
}
