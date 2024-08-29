import React, { useState, useEffect } from 'react';

function Search() {
  const [buttons, setButtons] = useState(() => {
    const savedButtons = localStorage.getItem('quickAccessButtons');
    return savedButtons ? JSON.parse(savedButtons) : [
      { id: 1, href: "https://www.instagram.com/", icon: "bi-instagram" },
      { id: 2, href: "https://x.com/home", icon: "bi-twitter" },
      { id: 3, href: "https://www.linkedin.com/feed/", icon: "bi-linkedin" },
      { id: 4, href: "https://www.youtube.com/", icon: "bi-youtube" },
      { id: 5, href: "https://www.behance.net/", icon: "bi-behance" },
      { id: 6, href: "https://github.com/", icon: "bi-github" },
      { id: 7, href: "https://www.twitch.tv/", icon: "bi-twitch" },
      { id: 8, href: "https://pinterest.com/", icon: "bi-pinterest" },
    ];
  });

  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const updateLocalStorage = (newButtons) => {
    localStorage.setItem('quickAccessButtons', JSON.stringify(newButtons));
  };

  const handleSaveButton = (button) => {
    let newButtons;
    if (selectedButton) {
      newButtons = buttons.map((b) => (b.id === selectedButton.id ? button : b));
    } else {
      newButtons = [...buttons, { ...button, id: buttons.length + 1 }];
    }
    setButtons(newButtons);
    updateLocalStorage(newButtons);
    setIsEditMenuOpen(false);
    setSelectedButton(null);
    setIsEditing(false);
  };

  const handleDeleteButton = (id) => {
    const newButtons = buttons.filter((b) => b.id !== id);
    setButtons(newButtons);
    updateLocalStorage(newButtons);
  };

  const handleEditButtonClick = (button) => {
    setSelectedButton(button);
    setIsEditing(true);
  };

  const handleAddButtonClick = () => {
    setSelectedButton(null);
    setIsEditing(true);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      window.location.href = searchUrl;
    }
  };

  return (
    <div className="search-container">
      <div className="search-input">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Web'de arama yapın..."
            className="search-query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      <div className="quick-access-buttons">
        {buttons.map((button) => (
          <a href={button.href} key={button.id} className="quick-access-button">
            <i className={`bi ${button.icon}`}></i>
          </a>
        ))}
        <a href="#" className="edit-buttons" onClick={() => setIsEditMenuOpen(true)}>
          <i className="bi bi-pencil-square"></i>
        </a>
      </div>

      {isEditMenuOpen && (
        <div className="edit-menu-popup">
          <EditMenu
            buttons={buttons}
            onSave={handleSaveButton}
            onDelete={handleDeleteButton}
            onClose={() => {
              setIsEditMenuOpen(false);
              setIsEditing(false);
            }}
            onAdd={handleAddButtonClick}
            onEdit={handleEditButtonClick}
            isEditing={isEditing}
            selectedButton={selectedButton}
          />
        </div>
      )}
    </div>
  );
}

function EditMenu({ buttons, onSave, onDelete, onClose, onAdd, onEdit, isEditing, selectedButton }) {
  const [href, setHref] = useState('');
  const [icon, setIcon] = useState('');

  const iconOptions = [
    "alexa", "behance", "discord", "dribbble", "facebook", "github", "gitlab", "google",
    "instagram", "line", "linkedin", "mastodon", "medium", "messenger", "microsoft-teams",
    "opencollective", "paypal", "pinterest", "quora", "reddit", "signal", "sina-weibo",
    "skype", "slack", "snapchat", "sourceforge", "spotify", "stack-overflow", "strava",
    "substack", "telegram", "tencent-qq", "threads", "threads-fill", "tiktok", "twitch",
    "twitter", "twitter-x", "vimeo", "wechat", "whatsapp", "wordpress", "yelp", "youtube",
    "globe"
  ];

  useEffect(() => {
    if (selectedButton) {
      setHref(selectedButton.href || '');
      setIcon(selectedButton.icon || '');
    } else {
      setHref('');
      setIcon('');
    }
  }, [selectedButton]);

  const handleSave = () => {
    if (href && icon) {
      onSave({ href, icon });
    }
  };

  return (
    <div className="edit-menu">
      <h3>Hızlı Erişim Butonları</h3>
      <table>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buttons.map((button) => (
            <tr key={button.id}>
              <td><i className={`bi ${button.icon}`}></i></td>
              <td>{button.href}</td>
              <td>
                <button onClick={() => onEdit(button)}>Düzenle</button>
                <button onClick={() => onDelete(button.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="edit-menu-actions">
        <button onClick={onAdd}>Buton Ekle</button>
        <button onClick={onClose}>Kapat</button>
      </div>
      {isEditing && (
        <div className="edit-form">
          <div className="edit-link">
            <label id='label-link'>Link:</label>
            <input type="text" value={href} onChange={(e) => setHref(e.target.value)} />
          </div>
          <label id='label-icon'>Icon:</label>
          <div className="icon-selection">
            {iconOptions.map((iconName) => (
              <label key={iconName} className="icon-radio">
                <input
                  type="radio"
                  name="icon"
                  value={`bi-${iconName}`}
                  checked={icon === `bi-${iconName}`}
                  onChange={(e) => setIcon(e.target.value)}
                />
                <i className={`bi bi-${iconName}`}></i>
              </label>
            ))}
          </div>
          <button onClick={handleSave}>Kaydet</button>
        </div>
      )}
    </div>
  );
}

export default Search;
