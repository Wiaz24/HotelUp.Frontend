FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ARG VITE_COGNITO_AUTHORITY
# ARG VITE_COGNITO_CLIENT
# ARG VITE_REDIRECT_URI
# ARG VITE_COGNITO_DOMAIN
# ARG VITE_LOGOUT_URI

# ENV VITE_COGNITO_AUTHORITY=$VITE_COGNITO_AUTHORITY
# ENV VITE_COGNITO_CLIENT=$VITE_COGNITO_CLIENT
# ENV VITE_REDIRECT_URI=$VITE_REDIRECT_URI
# ENV VITE_COGNITO_DOMAIN=$VITE_COGNITO_DOMAIN
# ENV VITE_LOGOUT_URI=$VITE_LOGOUT_URI

RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache perl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY /docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 5173

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]
# CMD ["nginx", "-g", "daemon off;"]