import Avatar from "@mui/material/Avatar";

function hashCode(str) {
  // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

function stringAvatar(name) {
  return {
    sx: {
      backgroundColor: `#${intToRGB(hashCode(name))}`,
      width: 56,
      height: 56,
    },
    children: `${name.split(" ")[0][0].toUpperCase()}${name
      .split(" ")[1][0]
      .toUpperCase()}`,
  };
}

export default function ProfileAvatar({ name }) {
  const style = stringAvatar(name);
  return <Avatar style={style.sx} children={style.children} />;
}
