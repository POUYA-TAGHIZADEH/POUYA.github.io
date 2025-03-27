async function getCountryInfo() {
    const countryName = document.getElementById('country-name').value.trim();
    const errorMessage = document.getElementById('error-message');
    const countryInfo = document.getElementById('country-info');
    const countryFlag = document.getElementById('country-flag'); // Bayrak öğesi

    errorMessage.textContent = '';
    countryInfo.style.display = 'none';

    if (!countryName) {
        errorMessage.textContent = 'Lütfen geçerli bir ülke adı girin!';
        return;
    }

    try {
        const response = await fetch(https://restcountries.com/v3.1/name/${countryName});
        if (!response.ok) throw new Error('Ülke bulunamadı!');

        const data = await response.json();
        const country = data[0];

        document.getElementById('country-name-display').textContent = country.name.common;
        document.getElementById('capital').textContent = country.capital ? country.capital[0] : 'Bilinmiyor';
        document.getElementById('population').textContent = country.population.toLocaleString();
        document.getElementById('languages').textContent = Object.values(country.languages || {}).join(', ') || 'Bilinmiyor';
        document.getElementById('currency').textContent = Object.values(country.currencies || {}).map(c => c.name).join(', ') || 'Bilinmiyor';

        // Bayrağı göster
        countryFlag.src = country.flags[0]; // Bayrak URL'si
        countryFlag.alt = ${country.name.common} Bayrağı;

        countryInfo.style.display = 'block';
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
