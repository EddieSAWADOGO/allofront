/* ==========================================================================
   MOCK DATA FOR DIRECTORY
   ========================================================================== */
const mockBrokers = [
    {
        id: 1,
        firstname: "Adama",
        lastname: "Ouédraogo",
        city: "Ouagadougou",
        specialties: "Location & Achat",
        phone: "70123456",
        rating: "4.8",
        smsReceived: "142",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        proCard: "https://images.unsplash.com/photo-1633113089631-6456cccaadad?w=600&q=80"
    },
    {
        id: 2,
        firstname: "Issa",
        lastname: "Kaboré",
        city: "Ouagadougou",
        specialties: "Achat (Terrains / Villas)",
        phone: "78451223",
        rating: "4.7",
        smsReceived: "210",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        proCard: "https://images.unsplash.com/photo-1633113089631-6456cccaadad?w=600&q=80"
    },
    {
        id: 3,
        firstname: "Moussa",
        lastname: "Sawadogo",
        city: "Ouagadougou",
        specialties: "Location uniquement",
        phone: "76112233",
        rating: "4.9",
        smsReceived: "305",
        avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop",
        proCard: "https://images.unsplash.com/photo-1633113089631-6456cccaadad?w=600&q=80"
    },
    {
        id: 4,
        firstname: "Lamine",
        lastname: "Diallo",
        city: "Ouagadougou",
        specialties: "Location & Achat",
        phone: "70556677",
        rating: "4.5",
        smsReceived: "89",
        avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&h=200&fit=crop",
        proCard: "https://images.unsplash.com/photo-1633113089631-6456cccaadad?w=600&q=80"
    },
    {
        id: 5,
        firstname: "Harouna",
        lastname: "Ilboudo",
        city: "Ouagadougou",
        specialties: "Achat Terrains",
        phone: "75889900",
        rating: "4.6",
        smsReceived: "120",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
        proCard: "https://images.unsplash.com/photo-1633113089631-6456cccaadad?w=600&q=80"
    },
    {
        id: 6,
        firstname: "Fatim",
        lastname: "Sankara",
        city: "Ouagadougou",
        specialties: "Location Villas",
        phone: "72114455",
        rating: "4.8",
        smsReceived: "56",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?w=200&h=200&fit=crop",
        proCard: "https://images.unsplash.com/photo-1633113089631-6456cccaadad?w=600&q=80"
    }
];

/* ==========================================================================
   DOM INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {

    // --- Global Numeric Input Restriction (Max 8 digits) ---
    document.addEventListener("input", (e) => {
        const target = e.target;
        // Apply to any tel input OR any input with "phone" or "otp" in its ID
        if (target.type === "tel" || (target.id && (target.id.toLowerCase().includes("phone") || target.id.toLowerCase().includes("otp")))) {
            // Only allow digits
            target.value = target.value.replace(/\D/g, "");
            // Enforce max 8 characters
            if (target.value.length > 8) {
                target.value = target.value.slice(0, 8);
            }
        }
    });

    // --- Navigation & Hamburger Menu ---
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });

        // Fermer le menu quand on clique sur un lien (même si c'est un lien vers une ancre sur la même page)
        navLinks.addEventListener("click", (e) => {
            if (e.target.closest("a")) {
                navLinks.classList.remove("active");
            }
        });

        // Fermer le menu si on clique n'importe où ailleurs sur la page
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }

    // --- Directory Rendering ---
    const directoryGridHome = document.getElementById("directory-grid"); // Preview on Index
    const directoryGridFull = document.getElementById("full-directory-grid"); // Full on Annuaire
    const searchInput = document.getElementById("directory-search-input");

    function renderBrokers(list, container, limit = null) {
        if (!container) return;
        container.innerHTML = "";

        const displayList = limit ? list.slice(0, limit) : list;

        if (displayList.length === 0) {
            container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--color-text-light);">Aucun démarcheur trouvé.</p>`;
            return;
        }

        displayList.forEach(broker => {
            const card = document.createElement("div");
            card.className = "broker-card-item";
            card.innerHTML = `
                <div class="broker-card-image-wrapper">
                    <img src="${broker.avatar}" alt="${broker.firstname} ${broker.lastname}" class="broker-card-img">
                    <div class="city-badge">${broker.city}</div>
                    <div class="verified-badge">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        Vérifié
                    </div>
                </div>
                <div class="broker-card-info" style="text-align: center;">
                    <h3 class="broker-card-name">${broker.firstname} ${broker.lastname}</h3>
                </div>
                <div class="broker-card-actions">
                    <button class="btn btn-primary btn-block btn-view-profile" data-id="${broker.id}">Voir plus</button>
                </div>
            `;
            container.appendChild(card);
        });

        // Add class for horizontal layout if on home page
        if (container.id === "directory-grid") {
            container.className = "directory-grid-horizontal";
        }

        // Bind Detail Buttons
        container.querySelectorAll(".btn-view-profile").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                const broker = mockBrokers.find(b => b.id == id);
                showBrokerDetails(broker);
            });
        });
    }

    // --- Neighborhood Autocomplete Logic ---
    function setupQuartierAutocomplete(inputId, resultsId) {
        const input = document.getElementById(inputId);
        const resultsContainer = document.getElementById(resultsId);

        if (!input || !resultsContainer || typeof ouagaQuartiers === 'undefined') return;

        input.addEventListener("input", () => {
            const val = input.value.toLowerCase();
            resultsContainer.innerHTML = "";
            if (!val) {
                resultsContainer.style.display = "none";
                return;
            }

            const filtered = ouagaQuartiers.filter(q => q.toLowerCase().includes(val));
            if (filtered.length > 0) {
                filtered.forEach(q => {
                    const div = document.createElement("div");
                    div.textContent = q;
                    div.addEventListener("click", () => {
                        input.value = q;
                        resultsContainer.style.display = "none";
                    });
                    resultsContainer.appendChild(div);
                });
                resultsContainer.style.display = "block";
            } else {
                resultsContainer.style.display = "none";
            }
        });

        // Close results when clicking outside
        document.addEventListener("click", (e) => {
            if (e.target !== input && e.target !== resultsContainer) {
                resultsContainer.style.display = "none";
            }
        });
    }

    setupQuartierAutocomplete("rent-quartier-input", "rent-quartier-results");
    setupQuartierAutocomplete("buy-quartier-input", "buy-quartier-results");

    // --- Advanced Options Toggle ---
    function setupAdvancedToggle(toggleId, groupId) {
        const toggle = document.getElementById(toggleId);
        const group = document.getElementById(groupId);
        if (toggle && group) {
            toggle.addEventListener("change", () => {
                if (toggle.checked) {
                    group.style.display = "block";
                } else {
                    group.style.display = "none";
                    // Optionnel : on vide le champ si on désactive l'option
                    const input = group.querySelector("input");
                    if (input) input.value = "";
                }
            });

            // Gérer la réinitialisation du formulaire (ex: après soumission)
            const form = toggle.closest("form");
            if (form) {
                form.addEventListener("reset", () => {
                    group.style.display = "none";
                });
            }
        }
    }

    setupAdvancedToggle("rent-advanced-toggle", "rent-quartier-group");
    setupAdvancedToggle("buy-advanced-toggle", "buy-quartier-group");

    const profileModal = document.getElementById("profile-modal");
    const profileModalContent = document.getElementById("profile-modal-content");
    const closeProfileModal = document.getElementById("close-profile-modal");

    if (closeProfileModal) {
        closeProfileModal.addEventListener("click", () => profileModal.classList.remove("active"));
    }

    // Close modal when clicking outside the box
    window.addEventListener("click", (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove("active");
        }
        if (e.target === alertModal) {
            alertModal.classList.remove("active");
        }
        if (paymentModal && e.target === paymentModal) {
            paymentModal.classList.remove("active");
        }
    });

    function showBrokerDetails(broker) {
        if (!profileModal || !profileModalContent) return;

        profileModalContent.innerHTML = `
            <div class="profile-top">
                <div class="profile-info-left">
                    <h4>${broker.firstname} ${broker.lastname}</h4>
                </div>
                <img src="${broker.avatar}" alt="${broker.firstname}" class="profile-avatar-right">
            </div>

            <div class="profile-pro-card-area">
                <img src="${broker.proCard}" alt="Carte Pro" class="profile-pro-card-img">
            </div>

            <div class="profile-actions-grid" style="display: flex; gap: 10px; margin-bottom: 12px;">
                <a href="tel:+226${broker.phone}" class="btn btn-secondary" style="flex: 1; gap: 6px; padding: 12px 5px; font-size: 0.85rem;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Appeler
                </a>
                <a href="https://wa.me/226${broker.phone}" target="_blank" class="btn btn-primary" style="flex: 1; background-color: #25D366; border-color: #25D366; gap: 6px; padding: 12px 5px; font-size: 0.85rem;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp
                </a>
            </div>
            <div style="width: 100%; display: flex; justify-content: center;">
                <button class="btn btn-secondary btn-share-profile" data-id="${broker.id}" style="margin: 0 auto; gap: 8px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                    Partager le profil
                </button>
            </div>
        `;

        profileModal.classList.add("active");

        // Bind share button
        const shareBtn = profileModalContent.querySelector(".btn-share-profile");
        if (shareBtn) {
            shareBtn.addEventListener("click", () => {
                const url = `${window.location.origin}/annuaires.html?id=${broker.id}`;
                navigator.clipboard.writeText(url);
                const originalText = shareBtn.innerHTML;
                shareBtn.innerHTML = "Lien copié !";
                setTimeout(() => shareBtn.innerHTML = originalText, 2000);
            });
        }
    }

    // Initial Renders
    renderBrokers(mockBrokers, directoryGridHome, 5);
    renderBrokers(mockBrokers, directoryGridFull);

    // Search Logic
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const val = e.target.value.toLowerCase();
            const filtered = mockBrokers.filter(b =>
                b.firstname.toLowerCase().includes(val) ||
                b.lastname.toLowerCase().includes(val) ||
                b.city.toLowerCase().includes(val) ||
                b.specialties.toLowerCase().includes(val)
            );
            renderBrokers(filtered, directoryGridFull);
        });
    }

    // --- Search Modals Logic ---
    const rentModal = document.getElementById("rent-modal");
    const buyModal = document.getElementById("buy-modal");
    const btnOpenRent = document.getElementById("btn-open-rent-modal");
    const btnOpenBuy = document.getElementById("btn-open-buy-modal");
    const btnCloseRent = document.getElementById("close-rent-modal");
    const btnCloseBuy = document.getElementById("close-buy-modal");

    if (btnOpenRent) {
        btnOpenRent.addEventListener("click", () => rentModal.classList.add("active"));
    }
    if (btnOpenBuy) {
        btnOpenBuy.addEventListener("click", () => buyModal.classList.add("active"));
    }
    if (btnCloseRent) {
        btnCloseRent.addEventListener("click", () => rentModal.classList.remove("active"));
    }
    if (btnCloseBuy) {
        btnCloseBuy.addEventListener("click", () => buyModal.classList.remove("active"));
    }

    // Form Submissions
    const rentForm = document.getElementById("rent-request-form");
    const buyForm = document.getElementById("buy-request-form");

    function handleRequestSubmit(e, modal, phoneId) {
        e.preventDefault();
        const phone = document.getElementById(phoneId).value.trim();
        const todayStr = new Date().toISOString().split("T")[0];
        const lastSubmissionKey = `allodemarcheur_last_sub_${phone}`;

        if (localStorage.getItem(lastSubmissionKey) === todayStr) {
            showNotification("Désolé", "Vous avez déjà fait une demande aujourd'hui avec ce numéro. Revenez demain !", "error");
            return;
        }

        localStorage.setItem(lastSubmissionKey, todayStr);
        showNotification("C'est envoyé !", "Votre demande a été transmise aux démarcheurs. Ils vous recontacteront bientôt.", "success");
        e.target.reset();
        modal.classList.remove("active");
    }

    if (rentForm) {
        rentForm.addEventListener("submit", (e) => handleRequestSubmit(e, rentModal, "rent-phone"));
    }
    if (buyForm) {
        buyForm.addEventListener("submit", (e) => handleRequestSubmit(e, buyModal, "buy-phone"));
    }

    // Update global click listener for new modals
    window.addEventListener("click", (e) => {
        if (e.target === profileModal) profileModal.classList.remove("active");
        if (e.target === alertModal) alertModal.classList.remove("active");
        if (e.target === paymentModal) paymentModal.classList.remove("active");
        if (e.target === rentModal) rentModal.classList.remove("active");
        if (e.target === buyModal) buyModal.classList.remove("active");
    });

    // --- Broker Registration (Demarcheur Page) ---
    const brokerRegisterForm = document.getElementById("broker-register-form");
    if (brokerRegisterForm) {
        const docInput = document.getElementById("broker-doc");
        const avatarInput = document.getElementById("broker-avatar");
        const docName = document.getElementById("doc-name");
        const avatarName = document.getElementById("avatar-name");

        docInput.addEventListener("change", (e) => {
            docName.textContent = e.target.files[0] ? e.target.files[0].name : "Aucun fichier choisi";
        });
        avatarInput.addEventListener("change", (e) => {
            avatarName.textContent = e.target.files[0] ? e.target.files[0].name : "Aucun fichier choisi";
        });

        brokerRegisterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showNotification("Inscription Reçue", "Votre dossier est en cours de validation (24-48h).", "success");
            brokerRegisterForm.reset();
            docName.textContent = "Aucun fichier choisi";
            avatarName.textContent = "Aucun fichier choisi";
        });
    }

    // --- Dashboard SMS & Packs (Demarcheur Page) ---
    const checkBalanceForm = document.getElementById("check-balance-form");
    const smsContainer = document.getElementById("sms-container-preview");
    if (checkBalanceForm) {
        checkBalanceForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const phone = document.getElementById("balance-phone").value.trim();

            if (smsContainer) {
                smsContainer.innerHTML = `
                    <div class="sms-bubble">Consultation du solde pour le +226${phone}...</div>
                    <div class="sms-bubble reply">[allodemarcheur] Bonjour ! Votre solde actuel est de : 12 Opportunités Payantes et 2 Opportunités Gratuites. Rechargez pour plus de leads !</div>
                `;
            }
            showNotification("SMS Envoyé", "Consultez votre téléphone pour voir vos crédits.", "success");
            checkBalanceForm.reset();
        });
    }

    const packRentBtn = document.getElementById("pack-rent-btn");
    const packBuyBtn = document.getElementById("pack-buy-btn");
    const rentPacks = document.getElementById("rent-packs-list");
    const buyPacks = document.getElementById("buy-packs-list");

    if (packRentBtn && packBuyBtn) {
        packRentBtn.addEventListener("click", () => {
            packRentBtn.classList.add("active");
            packBuyBtn.classList.remove("active");
            rentPacks.classList.add("active");
            buyPacks.classList.remove("active");
        });
        packBuyBtn.addEventListener("click", () => {
            packBuyBtn.classList.add("active");
            packRentBtn.classList.remove("active");
            buyPacks.classList.add("active");
            rentPacks.classList.remove("active");
        });
    }

    // --- FAQ Tab Switching ---
    const faqVisitorBtn = document.getElementById("faq-visitor-btn");
    const faqBrokerBtn = document.getElementById("faq-broker-btn");
    const faqVisitorList = document.getElementById("faq-visitor-list");
    const faqBrokerList = document.getElementById("faq-broker-list");

    if (faqVisitorBtn && faqBrokerBtn) {
        faqVisitorBtn.addEventListener("click", () => {
            faqVisitorBtn.classList.add("active");
            faqBrokerBtn.classList.remove("active");
            faqVisitorList.classList.add("active");
            faqVisitorList.style.display = "block";
            faqBrokerList.classList.remove("active");
            faqBrokerList.style.display = "none";
        });
        faqBrokerBtn.addEventListener("click", () => {
            faqBrokerBtn.classList.add("active");
            faqVisitorBtn.classList.remove("active");
            faqBrokerList.classList.add("active");
            faqBrokerList.style.display = "block";
            faqVisitorList.classList.remove("active");
            faqVisitorList.style.display = "none";
        });
    }

    // --- Payment Logic ---
    const paymentModal = document.getElementById("payment-modal");
    if (paymentModal) {
        document.querySelectorAll(".btn-buy-pack").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const packName = e.target.dataset.packName;
                const packPrice = e.target.dataset.packPrice;

                document.getElementById("checkout-pack-name").textContent = packName;
                document.getElementById("checkout-pack-price").textContent = Number(packPrice).toLocaleString() + " FCFA";

                // Update USSD code with amount
                const ussdCodeSpan = document.getElementById("ussd-code");
                if (ussdCodeSpan) {
                    ussdCodeSpan.textContent = `*144*4*6*${packPrice}#`;
                }

                paymentModal.classList.add("active");
            });
        });

        document.getElementById("close-payment-modal").addEventListener("click", () => paymentModal.classList.remove("active"));
        document.getElementById("payment-checkout-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const form = e.target;
            const loading = document.getElementById("payment-loading");
            const success = document.getElementById("payment-success");

            // Check if all fields are present (simulated)
            const phoneRecharge = document.getElementById("payment-phone-recharge").value;
            const phoneOtp = document.getElementById("payment-phone-otp").value;
            const otpCode = document.getElementById("payment-otp").value;

            if (!phoneRecharge || !phoneOtp || !otpCode) return;

            form.style.display = "none";
            // Hide header and instructions during loading for cleaner look
            const header = document.querySelector(".compact-checkout-header");
            const instruction = document.querySelector(".ussd-instruction");
            if (header) header.style.display = "none";
            if (instruction) instruction.style.display = "none";

            loading.style.display = "flex";
            setTimeout(() => {
                loading.style.display = "none";
                success.style.display = "flex";
            }, 2000);
        });
        document.getElementById("btn-close-success").addEventListener("click", () => {
            // Reset modal for next use
            const form = document.getElementById("payment-checkout-form");
            form.style.display = "block";
            form.reset();
            const header = document.querySelector(".compact-checkout-header");
            const instruction = document.querySelector(".ussd-instruction");
            if (header) header.style.display = "flex";
            if (instruction) instruction.style.display = "block";
            document.getElementById("payment-success").style.display = "none";

            paymentModal.classList.remove("active");
        });
    }

    // --- FAQ Logic ---
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(q => {
        q.addEventListener("click", () => {
            const item = q.parentElement;
            const isActive = item.classList.contains("active");
            document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
            if (!isActive) item.classList.add("active");
        });
    });

    // --- Global Notification / Alert ---
    const alertModal = document.getElementById("alert-modal");
    const alertTitle = document.getElementById("alert-title");
    const alertMsg = document.getElementById("alert-message");
    const alertIcon = document.getElementById("alert-icon-theme");
    const alertExtra = document.getElementById("alert-extra-content");

    function showNotification(title, message, type = "success", extra = "") {
        if (!alertModal) return;
        alertTitle.textContent = title;
        alertMsg.innerHTML = message;
        alertExtra.innerHTML = extra;
        alertExtra.style.display = extra ? "block" : "none";

        let iconHtml = "";
        if (type === "success") iconHtml = `<svg viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2" width="48" height="48"><circle cx="12" cy="12" r="10"></circle><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        else if (type === "error") iconHtml = `<svg viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" stroke-width="2" width="48" height="48"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
        else iconHtml = `<svg viewBox="0 0 24 24" fill="none" stroke="var(--color-info)" stroke-width="2" width="48" height="48"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

        alertIcon.innerHTML = iconHtml;
        alertModal.classList.add("active");
    }

    if (alertModal) {
        document.getElementById("close-alert-modal").addEventListener("click", () => alertModal.classList.remove("active"));
        document.getElementById("btn-alert-ok").addEventListener("click", () => alertModal.classList.remove("active"));
    }

    // --- Feedback Form ---
    const feedbackForm = document.getElementById("feedback-form");
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showNotification("Avis Envoyé", "Merci pour votre retour ! Votre avis sera publié après modération.", "success");
            feedbackForm.reset();
        });
    }

});
