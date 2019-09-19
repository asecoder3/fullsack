const main = {
  key: '',
  value: '',
  create: () => {
    main.key = (Math.random() * 10000).toString();
    main.value = (Math.random() * 1000000).toString();
    document.write(main.key + '<br>' + main.value);
  }
};
document.write(main.key + '<br>' + main.value);
